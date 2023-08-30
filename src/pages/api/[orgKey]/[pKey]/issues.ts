import type { NextApiRequest, NextApiResponse } from "next";
import { IssueData } from "lib/types";
import IssueService from "@/server/service/IssueService";
import AppError from "@/server/service/AppError";
import { getQueryParam, getRequestBody } from "@/server/utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const projectKey: string = getQueryParam(req, "pKey");
  const organisation: string = getQueryParam(req, "orgKey");

  if (projectKey === "" || organisation === "") {
    res.status(405).end();
    return;
  }

  const issueList = new IssueService(projectKey, organisation);

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
        res.send(JSON.stringify(newIssue));
      } catch (e) {
        if (e instanceof Error) {
          res.statusCode = 400;
          console.log(e);
          res.end(e.message);
        }
      }
      break;
    default:
      res.status(405).end();
  }
}
