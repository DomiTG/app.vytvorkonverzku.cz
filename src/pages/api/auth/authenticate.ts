import prisma from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import zod, { ZodError } from "zod";
import bcrypt from "bcrypt";
import { sign as signJWT } from "jsonwebtoken";
import { NextResponse } from "next/server";

const schema = zod.object({
  username: zod.string().min(3).max(20),
  password: zod.string().min(8),
});

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ success: false, message: "Method not allowed" });
  }
  try {
    const { username, password } = schema.parse(req.body);
    const user = await prisma.users.findFirst({
      where: { username: username.toLowerCase() },
    });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }
    const passwordCheck = await bcrypt.compare(password, user.password);
    if (!passwordCheck) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const accessToken = signJWT(
      { id: user.id },
      process.env.ACCESS_TOKEN_SECRET as string,
      {
        expiresIn: "15m",
      },
    );
    const refreshToken = signJWT(
      { id: user.id },
      process.env.REFRESH_TOKEN_SECRET as string,
      {
        expiresIn: "7d",
      },
    );

    const session = await prisma.refresh_tokens.create({
      data: {
        created_at: new Date(),
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        token: refreshToken,
        user_id: user.id,
      },
    });

    const isSecure = process.env.NODE_ENV === "production";
    console.log("isSecure", isSecure);
    return res
      .setHeader(
        "Set-Cookie",
        `refresh_token=${session.token}; HttpOnly; Secure=${isSecure}; Path=/; Max-Age=${60 * 60 * 24 * 7}; SameSite=Strict`,
      )
      .json({
        success: true,
        data: {
          accessToken,
        },
      });
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

export default handler;
