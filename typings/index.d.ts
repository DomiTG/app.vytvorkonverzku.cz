import type { NextApiRequest } from "next";
import { users } from "@prisma/client";

declare module "next" {
  interface NextApiRequest {
    user?: users;
  }
}
