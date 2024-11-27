import prisma from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import zod, { ZodError } from "zod";
import bcrypt from "bcrypt";

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
