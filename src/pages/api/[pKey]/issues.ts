import type { NextApiRequest, NextApiResponse } from "next";
import { Issue, IssueData } from "lib/types";
import {
  IssueRequest,
  createIssueRequest,
  IssueListService,
} from "@/server/service/Issue";
import { JWT } from "next-auth/jwt";
import { getUserToken } from "@/server/auth/session";
import AppError from "@/server/service/AppError";
import { INVALID_TOKEN } from "@/lib/client-data/errors";
import { getUrlDynamicParam } from "@/server/utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IssueData[] | IssueData | undefined>
): Promise<void> {
  const projectKey: string = getUrlDynamicParam(req, "pKey");

  if (projectKey === "") {
    res.status(405).end();
    return;
  }

  const userToken: JWT = await getUserToken(req);
  const userId: string = userToken.id;
  const issueList: IssueListService = new IssueListService(projectKey, userId);

  if (Number.isNaN(Number(userId))) {
    res.statusCode = 401;
    const error: AppError = new AppError(INVALID_TOKEN, "Invalid token");
    res.end(error.toJSONString());
    return;
  }

  switch (req.method) {
    case "GET":
      const allIssues: Issue[] = await issueList.getAllIssues();
      const response: IssueData[] = allIssues.map(issue =>
        issue.serialiseToData()
      );
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(response));
      break;
    case "POST":
      const request: IssueRequest = createIssueRequest(req);
      try {
        const newIssue: Issue = await issueList.saveIssue(request);
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.end(newIssue.serialiseToData());
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
