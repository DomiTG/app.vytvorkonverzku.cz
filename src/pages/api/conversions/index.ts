import type { NextApiRequest, NextApiResponse } from "next";
import { withMiddleware } from "../middleware/withMiddleware";
import authenticate from "../middleware/authMiddleware";
import prisma from "@/lib/prisma";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req;
  if (!user)
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized", conversions: [] });
  try {
    const conversions = await prisma.conversion_pages.findMany({
      where: { creator_id: user.id },
      select: {
        id: true,
        name: true,
        description: true,
        type: true,
        created_at: true,
        updated_at: true,
        live_mode: true,
        creator_id: false,
        domains: {
          select: {
            id: true,
            page_id: false,
            created_at: true,
            renewed_at: false,
            domain: true,
            system_domain: true,
          },
        },
      },
    });
    return res.status(200).json({
      success: true,
      converses: conversions,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      conversions: [],
    });
  }
}

export default withMiddleware(authenticate, "GET")(handler);
