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
      project.getAllIssues().then((issues: UIIssue[]): void => {
        res.status(200).json(issues);
      });
      break;
    case "POST":
      const request: IssueRequest = new NextjsIssueRequest(req);
      project
        .saveIssue(request)
        .then((): void => {
          res.status(200).end();
        })
        .catch((e: Error): void => {
          res.status(400).json(e.message);
        });
      break;
    default:
      res.status(405).end();
  }
}
