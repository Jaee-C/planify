import type { NextApiRequest, NextApiResponse } from "next";
import { Issue, IssueResponse } from "lib/types";
import { IssueRequest, NextjsIssueRequest } from "@/server/service/Issue";
import Project from "@/server/service/Project";
import { JWT } from "next-auth/jwt";
import { getUserToken } from "@/lib/auth/session";
import { getServerUrlParam } from "@/lib/utils";
import AppError from "@/server/service/AppError";
import { INVALID_TOKEN } from "@/lib/data/errors";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IssueResponse[] | string | undefined>
): Promise<void> {
  const projectKey: string = getServerUrlParam(req, "pKey");

  if (projectKey === "") {
    res.status(405).end();
    return;
  }

  const userToken: JWT = await getUserToken(req);
  const userId: string = userToken.id;
  const project: Project = new Project(projectKey, userId);

  if (Number.isNaN(Number(userId))) {
    res.statusCode = 401;
    const error: AppError = new AppError(INVALID_TOKEN, "Invalid token");
    res.end(error.toJSONString());
    return;
  }

  switch (req.method) {
    case "GET":
      const allIssues: Issue[] = await project.getAllIssues();
      const response: IssueResponse = { data: allIssues };
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(response));
      break;
    case "POST":
      const request: IssueRequest = new NextjsIssueRequest(req);
      try {
        const newIssue: Issue = await project.saveIssue(request);
        const response = { data: [newIssue] };
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(response));
      } catch (e) {
        if (e instanceof AppError) {
          res.statusCode = 400;
          res.end(e.toJSONString());
        }
      }
      break;
    default:
      res.status(405).end();
  }
}
