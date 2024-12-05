import type { NextApiRequest, NextApiResponse } from "next";
import { withMiddleware } from "../middleware/withMiddleware";
import authenticate from "../middleware/authMiddleware";
import prisma from "@/lib/prisma";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const templates = await prisma.converse_templates.findMany({
      select: {
        id: true,
        creator_id: false,
        name: true,
        description: true,
        created_at: true,
        template: false,
        thumbnail_url: true,
        converse_type: true,
        creator: {
          select: {
            username: true,
          },
        },
      },
    });
    return res.status(200).json({ success: true, templates });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
}

export default withMiddleware(authenticate, "GET")(handler);
