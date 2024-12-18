import type { NextApiRequest, NextApiResponse } from "next";
import { withMiddleware } from "../middleware/withMiddleware";
import authenticate from "../middleware/authMiddleware";
import zod, { ZodError } from "zod";
import prisma from "@/lib/prisma";

const schema = zod.object({
  name: zod.string(),
  description: zod.string(),
  template: zod.string(),
  thumbnail_url: zod.string(),
  converse_type: /* HAS TO BE EMAIL OR ESHOP */ zod
    .string()
    .refine((val) => val === "email" || val === "product", {
      message: "Invalid converse type",
    }),
});

const rateTimeout = new Map<number, number>();

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { name, description, template, thumbnail_url, converse_type } =
      schema.parse(req.body);
    const { user } = req;
    if (!user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    if (rateTimeout.has(user.id)) {
      const timeout = rateTimeout.get(user.id);
      if (timeout && timeout > Date.now()) {
        return res.status(429).json({
          success: false,
          message: "Rate limit exceeded",
        });
      } else {
        rateTimeout.delete(user.id);
      }
    }
    rateTimeout.set(user.id, Date.now() + 1000 * 60 * 60);
    const newTemplate = await prisma.converse_templates.create({
      data: {
        name,
        description,
        template,
        thumbnail_url,
        converse_type: converse_type === "email" ? "EMAIL" : "PRODUCT",
        created_at: new Date(),
        creator_id: user.id,
      },
    });
    return res.status(201).json({ success: true, data: newTemplate });
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
