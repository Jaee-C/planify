import { NextApiRequest, NextApiResponse } from "next";
import { IssueResponse } from "@/lib/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IssueResponse[] | string | undefined>
): Promise<void> {
  switch (req.method) {
    case "GET":
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
    default:
      res.status(405).end();
  }
}
