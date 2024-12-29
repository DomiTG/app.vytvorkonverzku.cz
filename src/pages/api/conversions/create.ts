import type { NextApiRequest, NextApiResponse } from "next";
import { withMiddleware } from "../middleware/withMiddleware";
import authenticate from "../middleware/authMiddleware";
import zod, { ZodError } from "zod";
import prisma from "@/lib/prisma";

const schema = zod.object({
  name: zod.string().min(3).max(50),
  type: zod.enum(["PRODUCT", "EMAIL"]),
  description: zod.string().optional(),
  domain_name: zod.string().min(3).max(50),
  product_id: zod.number(),
  template_id: zod.number(),
});

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req;
  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const { name, type, description, domain_name, product_id, template_id } =
      schema.parse(req.body);
    const nameRegex = /^[a-zA-Z0-9_]+$/;
    if (!nameRegex.test(name)) {
      return res
        .status(400)
        .json({ success: false, message: "Name must be alphanumeric" });
    }
    const domainRegex = /^[a-zA-Z0-9_-]{3,20}$/;
    if (!domainRegex.test(domain_name)) {
      return res
        .status(400)
        .json({ success: false, message: "Domain name must be alphanumeric" });
    }
    const domain = await prisma.page_domains.findFirst({
      where: { domain: domain_name.toLowerCase() },
    });
    if (domain) {
      return res
        .status(400)
        .json({ success: false, message: "Domain name already exists" });
    }
    const template = await prisma.converse_templates.findFirst({
      where: { id: template_id },
    });
    if (!template) {
      return res
        .status(400)
        .json({ success: false, message: "Template not found" });
    }
    if (template.converse_type !== type) {
      return res
        .status(400)
        .json({ success: false, message: "Template type does not match" });
    }
    const product = await prisma.products.findFirst({
      where: { id: product_id },
    });
    if (!product) {
      return res
        .status(400)
        .json({ success: false, message: "Product not found" });
    }
    if (product.creator_id !== user.id) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    if (product.product_type !== type) {
      return res
        .status(400)
        .json({ success: false, message: "Product type does not match" });
    }
    const converse = await prisma.conversion_pages.create({
      data: {
        name,
        description,
        type,
        live_mode: false,
        creator_id: user.id,
        product_id,
      },
    });
    if (!converse) {
      return res
        .status(500)
        .json({ success: false, message: "An error occurred" });
    }
    const newDomain = await prisma.page_domains.create({
      data: {
        page_id: converse.id,
        created_at: new Date(),
        domain: domain_name.toLowerCase() + ".konverzka.vytvorkonverzku.cz",
        system_domain: true,
      },
    });
    if (!newDomain) {
      return res
        .status(500)
        .json({ success: false, message: "An error occurred" });
    }
    return res.status(201).json({ success: true, converse });
  } catch (err) {
    if (err instanceof ZodError) {
      return res.status(400).json({
        success: false,
        message: err.errors.map((error) => error.message).join(", "),
      });
    } else {
      return res
        .status(500)
        .json({ success: false, message: "An error occurred" });
    }
  }
}

export default withMiddleware(authenticate, "POST")(handler);
