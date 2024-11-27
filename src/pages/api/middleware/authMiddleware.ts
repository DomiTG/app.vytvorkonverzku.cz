import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";
import { users } from "@prisma/client";

const authenticate = async (
  req: NextApiRequest,
  res: NextApiResponse,
  next: () => void,
) => {
  const token = req.headers.authorization?.split(" ")[1]; // Expected format: "Bearer <token>"
  
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Authorization token missing" });
  }

  try {
    const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as {
      id: number;
    };
    const user = await prisma.users.findFirst({
      where: {
        id: payload.id,
      },
      select: {
        id: true,
        username: true,
        display_name: true,
        password: false,
        email_address: true,
        created_at: true,
        updated_at: true,
      },
    });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }
    req.user = user as users;
    next();
  } catch (err) {
    res
      .status(403)
      .json({ success: false, message: "Invalid or expired token" });
  }
};

export default authenticate;
