// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import zod, { ZodError } from "zod";
import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";

const schema = zod.object({
  email_address: zod.string().email(),
  username: zod.string().min(3).max(20),
  password: zod.string().min(8),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ success: false, message: "Method not allowed" });
  }
  //check validity of body
  try {
    if ((await prisma.users.count()) > 0) {
      return res.status(400).json({
        success: false,
        message: "First user already exists",
      });
    }
    const { email_address, username, password } = schema.parse(req.body);
    await prisma.users.create({
      data: {
        username: username.toLowerCase(),
        password: await bcrypt.hash(password, 10),
        email_address: email_address.toLowerCase(),
      },
    });
    return res.status(201).json({ success: true });
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
