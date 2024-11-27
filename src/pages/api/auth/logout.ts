import type { NextApiRequest, NextApiResponse } from "next";
import { withMiddleware } from "../middleware/withMiddleware";
import authenticate from "../middleware/authMiddleware";
import prisma from "@/lib/prisma";

async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const refreshToken = req.cookies["refresh_token"];
        if(refreshToken) {
            await prisma.refresh_tokens.deleteMany({
                where: {
                    token: refreshToken
                }
            });
        }
        res.setHeader("Set-Cookie", "refresh_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT");
        return res.status(200).json({ success: true, message: "Logged out" });
    } catch(err) {
        return res.status(500).json({ success: false, message: "An error occurred" });
    }
}

export default withMiddleware(authenticate, "POST")(handler);