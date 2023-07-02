import type { NextApiRequest, NextApiResponse } from "next";
import { Issue, IssueResponse, StatusType, PriorityType } from "lib/types";
import { IssueRequest, NextjsIssueRequest } from "@/server/service/Issue";
import Project from "@/server/service/Project";
import { JWT } from "next-auth/jwt";
import { getUserToken } from "@/lib/auth/session";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IssueResponse[] | string | undefined>
): Promise<void> {
  if (Array.isArray(req.query.pKey) || req.query.pKey === undefined) {
    res.status(405).end();
    return;
  }
  const userToken: JWT = await getUserToken(req);
  const userId: string = userToken.id;
  const project: Project = new Project(req.query.pKey, userId);

  switch (req.method) {
    case "GET":
      const allIssues: Issue[] = await project.getAllIssues();
      const statuses: StatusType[] = await project.getAllStatuses();
      const priorities: PriorityType[] = await project.getAllPriorities();
      const response: IssueResponse = new IssueResponse(
        allIssues,
        statuses,
        priorities
      );

      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(response));
      break;
    case "POST":
      const request: IssueRequest = new NextjsIssueRequest(req);
      try {
        const response = { message: "Done." };
        await project.saveIssue(request);
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(response));
      } catch (e: any) {
        res.statusCode = 400;
        res.end(e.message);
      }
      break;
    default:
      res.status(405).end();
  }
}