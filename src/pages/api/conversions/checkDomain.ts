import type { NextApiRequest, NextApiResponse } from "next";
import { withMiddleware } from "../middleware/withMiddleware";
import authenticate from "../middleware/authMiddleware";
import prisma from "@/lib/prisma";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { domain } = req.query;
    if (!domain)
      return res
        .status(400)
        .json({ success: false, message: "Domain is required" });
    //should be string, with numbers, letters, don't allow dots and stuff like that, but allow - and _, min 3, max 20, no spaces
    const regex = /^[a-zA-Z0-9_-]{3,20}$/;
    if (!regex.test(domain as string))
      return res
        .status(400)
        .json({ success: false, message: "Invalid domain" });
    //check if domain is taken
    const domainExists = await prisma.page_domains.findFirst({
      where: { domain: (domain as string).toLowerCase() },
    });
    return res.status(200).json({ success: true, exists: !!domainExists });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: (err as any).message });
  }
}

export default withMiddleware(authenticate, "GET")(handler);
