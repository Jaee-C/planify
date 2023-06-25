import type { NextApiRequest, NextApiResponse } from "next";
import {
  getAllIssues,
  addIssue,
  IssueRequest,
  createIssueRequest,
} from "@/server/service/Issue";
import { ServerIssue, UIIssue } from "@/interfaces";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<UIIssue[] | string | undefined>
): void {
  switch (req.method) {
    case "GET":
      res.status(200).json(getAllIssues());
      break;
    case "POST":
      const request: IssueRequest = createIssueRequest(req);
      addIssue(request);
      res.status(200);
      break;
    default:
      res.status(405).end();
  }
}
