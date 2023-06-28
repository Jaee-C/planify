import type { NextApiRequest, NextApiResponse } from "next";
import { Issue, IssueResponse, StatusType } from "@/interfaces";
import { IssueRequest, NextjsIssueRequest } from "@/server/service/Issue";
import Project from "@/server/service/Project";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IssueResponse[] | string | undefined>
): Promise<void> {
  if (req.query.pid === undefined || Array.isArray(req.query.pid)) {
    res.status(405).end();
    return;
  }
  const project: Project = new Project(parseInt(req.query.pid));

  switch (req.method) {
    case "GET":
      const allIssues: Issue[] = await project.getAllIssues();
      const statuses: StatusType[] = await project.getAllStatuses();
      const response: IssueResponse = new IssueResponse(allIssues, statuses);

      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(response));
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
