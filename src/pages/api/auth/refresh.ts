import prisma from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { verify as verifyJWT, sign as signJWT } from "jsonwebtoken";

async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method !== "POST") {
        return res.status(405).json({ success: false, message: "Method not allowed" });
    }
    const refreshToken = req.cookies["refresh_token"];
    if(!refreshToken) {
        return res.status(401).json({ success: false, message: "No refresh token provided" });
    }
    try {
        const rT = await prisma.refresh_tokens.findFirst({
            where: {
                token: refreshToken
            }
        });
        if(!rT || (new Date(rT.expires).getTime() < Date.now())) {
            if(rT) {
                await prisma.refresh_tokens.delete({
                    where: {
                        id: rT.id
                    }
                });
            }
            return res.status(401).json({ success: false, message: "Invalid refresh token" });
        }
        const jwtToken = verifyJWT(refreshToken, process.env.REFRESH_TOKEN_SECRET as string);
        if(typeof jwtToken !== "object" || !jwtToken.id) {
            return res.status(401).json({ success: false, message: "Invalid refresh token" });
        }
        const user = await prisma.users.findFirst({
            where: {
                id: jwtToken.id
            }
        });
        if(!user) {
            return res.status(401).json({ success: false, message: "User not found" });
        }
        const accessToken = signJWT(
            { id: user.id },
            process.env.ACCESS_TOKEN_SECRET as string,
            {
                expiresIn: "15m"
            }
        );
        return res.status(200).json({ success: true, accessToken, user: { id: user.id, username: user.username, email: user.email_address } });
    } catch(err) {
        return res.status(500).json({ success: false, message: "An error occurred" });
    }
}

export default handler;