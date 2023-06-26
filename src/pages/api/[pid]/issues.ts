import type { NextApiRequest, NextApiResponse } from "next";
import { UIIssue } from "@/interfaces";
import IssueRequest from "@/server/service/Issue/IssueRequest";
import NextjsIssueRequest from "@/server/service/Issue/NextjsIssueRequest";
import Project from "@/server/service/Project";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<UIIssue[] | string | undefined>
): void {
  if (req.query.pid === undefined || Array.isArray(req.query.pid)) {
    res.status(405).end();
    return;
  }
  const project: Project = new Project(parseInt(req.query.pid));

  switch (req.method) {
    case "GET":
      res.status(200).json(project.getAllIssues());
      break;
    case "POST":
      const request: IssueRequest = new NextjsIssueRequest(req);

      try {
        project.saveIssue(request);
      } catch (e: unknown) {
        if (e instanceof Error) {
          res.status(400).json(e.message);
          return;
        }
      }

      res.status(200);
      break;
    default:
      res.status(405).end();
  }
}
