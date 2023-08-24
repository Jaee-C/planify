import type { NextApiRequest, NextApiResponse } from "next";
import { IssueData } from "lib/types";
import { IssueListService } from "@/server/service/Issue";
import AppError from "@/server/service/AppError";
import { getUrlParam } from "@/server/utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IssueData[] | IssueData | undefined>
): Promise<void> {
  const projectKey: string = getUrlParam(req, "pKey");
  const organisation: string = getUrlParam(req, "orgKey");

  if (projectKey === "" || organisation === "") {
    res.status(405).end();
    return;
  }

  const issueList = new IssueListService(projectKey, organisation);

  switch (req.method) {
    case "GET":
      const response: IssueData[] = await issueList.getAllIssues();
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(response));
      break;
    case "POST":
      try {
        const newIssue: IssueData = await issueList.saveIssue(req);
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.end(newIssue);
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
