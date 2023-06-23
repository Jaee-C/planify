import { NextApiRequest, NextApiResponse } from "next";
import { deleteIssue } from "@/service/Issue";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>
): void {
  const { pid, id } = req.query;
  switch (req.method) {
    case "DELETE":
      deleteIssue(Number(id));
      res.status(200).send(`DELETE ${id}`);
      break;
    default:
      res.status(405).end();
  }
}
