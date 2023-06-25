import { NextApiRequest, NextApiResponse } from "next";
import { deleteIssue } from "@/server/service/Issue";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>
): void {
  const query: NextApiRequest["query"] = req.query;
  switch (req.method) {
    case "DELETE":
      deleteIssue(Number(query.id));
      res.status(200).send(`DELETE ${query.id}`);
      break;
    default:
      res.status(405).end();
  }
}
