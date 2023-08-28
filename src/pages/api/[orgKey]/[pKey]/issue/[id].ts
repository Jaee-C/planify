import { NextApiRequest, NextApiResponse } from "next";
import IssueService from "@/server/service/IssueService";
import AppError from "@/server/service/AppError";
import { IssueData } from "@/lib/types";
import { getUrlParam } from "@/server/utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string | IssueData>
): Promise<void> {
  const issueKey: string = getUrlParam(req, "id");
  const projectKey: string = getUrlParam(req, "pKey");
  const organisation: string = getUrlParam(req, "orgKey");

  if (projectKey === "" || organisation === "") {
    res.status(405).end();
    return;
  }

  const issueService = new IssueService(projectKey, organisation);

  switch (req.method) {
    case "GET":
      try {
        const issue = await issueService.getOneIssue(issueKey);
        res.status(200).json(issue);
      } catch {
        res.status(404).end();
      }
      break;
    case "PUT":
      try {
        const newIssue = await issueService.editIssue(req, issueKey);
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.status(200).send(newIssue);
      } catch (e) {
        if (e instanceof AppError) {
          res.status(404).send(e.toJSONString());
        } else {
          console.log(AppError.generateAppError(e));
          res.status(500).send(AppError.generateAppError(e).toJSONString());
        }
      }
      break;
    case "DELETE":
      await issueService.deleteIssue(issueKey);
      res.status(200).send(`DELETE ${issueKey}`);
      break;
    default:
      res.status(405).end();
  }
}
