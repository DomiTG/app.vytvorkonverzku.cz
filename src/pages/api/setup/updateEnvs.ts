import { neededEnvs } from "@/lib/serverConsts";
import { NextApiRequest, NextApiResponse } from "next";
import { exec } from "child_process";
import path from "path";
import fs from "fs";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    const {
      envs,
    }: {
      envs: { key: string; value: string }[];
    } = JSON.parse(req.body);
    try {
      const environments = process.env;
      //Check if needed environments are set, if yes, return an error
      const missingEnvs = neededEnvs.filter((env) => !environments[env]);
      if (missingEnvs.length === 0) {
        return res.status(400).json({
          success: false,
          message: "All needed environments are already set",
        });
      }
      const envPath = path.resolve(process.cwd(), ".env");
      envs.map((env) => {
        fs.writeFileSync(envPath, `${env.key}=${env.value}\n`, { flag: "a" });
      });
      return res.status(200).json({ success: true });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ success: false });
    }
  }
}
