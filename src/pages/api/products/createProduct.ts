import type { NextApiRequest, NextApiResponse } from "next";
import { withMiddleware } from "../middleware/withMiddleware";
import authenticate from "../middleware/authMiddleware";
import zod, { ZodError } from "zod";
import prisma from "@/lib/prisma";

const schema = zod.object({
  name: zod.string().min(3).max(255),
  product_type: zod
    .string()
    .min(2)
    .refine((val) => {
      return ["PRODUCT", "EMAIL"].includes(val);
    }),
  product_subtype: zod
    .string()
    .min(2)
    .refine((val) => {
      return ["PHYSICAL", "DIGITAL"].includes(val);
    }),
  prices: zod.array(
    zod.object({
      currency: zod.string().min(3).max(3),
      price: zod.number().min(0),
    }),
  ),
  weight: zod.number().min(0.1).optional(),
  tax: zod.object({
    taxPayer: zod.boolean(),
    taxRate: zod.number().min(0),
    taxIncluded: zod.boolean(),
  }),
  digital: zod
    .object({
      html_content: zod.string().optional(),
      attachments: zod.array(zod.string()).optional(),
    })
    .optional(),
});

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { user } = req;
    if (!user)
      return res.status(401).json({ success: false, message: "Unauthorized" });
    const parsed = schema.parse(req.body);
    const prices = JSON.stringify(
      parsed.prices.map((price) => {
        return { currency: price.currency, price: price.price };
      }),
    );

    let additionalData = {};
    if (parsed.product_subtype === "DIGITAL") {
      if (!parsed.digital) {
        return res.status(400).json({
          success: false,
          message: "Digital products must have digital data",
        });
      }
      const { html_content, attachments } = parsed.digital;
      if (!html_content || !attachments) {
        return res.status(400).json({
          success: false,
          message: "Digital products must have html_content and attachments",
        });
      }
      additionalData = {
        ...additionalData,
        email_html_content: html_content,
        attachments: JSON.stringify(attachments),
      };
    }
    if (parsed.product_subtype === "PHYSICAL") {
      if (!parsed.weight) {
        return res.status(400).json({
          success: false,
          message: "Physical products must have a weight",
        });
      }
      additionalData = {
        ...additionalData,
        weight: parsed.weight,
      };
    }
    const product = await prisma.products.create({
      data: {
        creator_id: user.id,
        name: parsed.name,
        product_type: parsed.product_type as "PRODUCT" | "EMAIL",
        product_subtype: parsed.product_subtype as "PHYSICAL" | "DIGITAL",
        prices,
        tax_payer: parsed.tax.taxPayer,
        tax_included: parsed.tax.taxIncluded,
        tax_rate: parsed.tax.taxRate,
        ...additionalData,
      },
    });
    return res.status(201).json({ success: true, data: product });
  } catch (err) {
    if (err instanceof ZodError) {
      console.log(err);
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
