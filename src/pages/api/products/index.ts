import type { NextApiRequest, NextApiResponse } from "next";
import { withMiddleware } from "../middleware/withMiddleware";
import authenticate from "../middleware/authMiddleware";
import prisma from "@/lib/prisma";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req;
  if (!user)
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized", products: [] });
  try {
    const products = await prisma.products.findMany({
      where: {
        creator_id: user.id,
      },
      select: {
        id: true,
        creator_id: true,
        name: true,
        product_type: true,
        product_subtype: true,
        prices: true,
        tax_payer: true,
        tax_included: true,
        tax_rate: true,
        email_html_content: true,
        attachments: true,
      },
    });
    return res
      .status(200)
      .json({ success: true, message: "Products found", products });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error", products: [] });
  }
}

export default withMiddleware(authenticate, "GET")(handler);
