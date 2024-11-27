import { NextApiRequest, NextApiResponse } from "next";

// Define the Middleware type
type Middleware = (
  req: NextApiRequest,
  res: NextApiResponse,
  next: () => void,
) => void;

export const withMiddleware =
  (middleware: Middleware, method: string = "POST") =>
  (handler: (req: NextApiRequest, res: NextApiResponse) => void) => {
    return (req: NextApiRequest, res: NextApiResponse) => {
      if (req.method !== method) {
        return res
          .status(405)
          .json({ success: false, message: "Method not allowed" });
      }
      // Apply the middleware to the request and response
      middleware(req, res, () => {
        // After the middleware runs, call the handler
        handler(req, res);
      });
    };
  };
