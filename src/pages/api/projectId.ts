import { NextApiRequest, NextApiResponse } from "next";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>
): void {
  switch (req.method) {
    case "GET":
      res.status(200).send("PRJ");
      break;
    default:
      res.status(405).end();
  }
}
