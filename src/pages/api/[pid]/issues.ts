import type { NextApiRequest, NextApiResponse } from "next";
import Issue from "@/interfaces/Issue";
import { IssueRequest, NextjsIssueRequest } from "@/server/service/Issue";
import Project from "@/server/service/Project";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Issue[] | string | undefined>
): Promise<void> {
  if (req.query.pid === undefined || Array.isArray(req.query.pid)) {
    res.status(405).end();
    return;
  }
  const project: Project = new Project(parseInt(req.query.pid));

  return new Promise(resolve => {
    switch (req.method) {
      case "GET":
        project.getAllIssues().then((issues: Issue[]): void => {
          res.status(200).json(issues);
          resolve();
        });
        break;
      case "POST":
        const request: IssueRequest = new NextjsIssueRequest(req);
        project
          .saveIssue(request)
          .then((): void => {
            res.status(200).end();
            resolve();
          })
          .catch((e: Error): void => {
            res.status(400).json(e.message);
            resolve();
          });
        break;
      default:
        res.status(405).end();
        resolve();
    }
  });
}
