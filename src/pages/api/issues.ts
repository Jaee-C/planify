import type { NextApiRequest, NextApiResponse } from "next";
import {
  getAllIssues,
  addIssue,
  IssueRequest,
  createIssueRequest,
} from "@/service/Issue";
import { ServerIssue } from "@/interfaces";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ServerIssue[] | string>
) {
  switch (req.method) {
    case "GET":
      res.status(200).json(getAllIssues());
      break;
    case "POST":
      const request: IssueRequest = createIssueRequest(req);
      addIssue(request);
      res.status(200).send("DONE.");
      break;
    default:
      res.status(405).end();
  }
}