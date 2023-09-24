import { NextApiRequest, NextApiResponse } from "next";
import IssueService from "@/server/service/IssueService";
import AppError from "@/server/service/AppError";
import { IssueData } from "@/lib/types";
import { getQueryParam } from "@/server/utils";
import { verifyOrgPermission } from "@/server/auth/permissions";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string | IssueData>
): Promise<void> {
  const issueKey: string = getQueryParam(req, "id");
  const projectKey: string = getQueryParam(req, "pKey");
  const organisation: string = getQueryParam(req, "orgKey");

  if (projectKey === "" || organisation === "") {
    res.status(405).end();
    return;
  }

  if (!(await verifyOrgPermission(req, res))) {
    return;
  }

  const issueService = new IssueService(projectKey, organisation);

  switch (req.method) {
    case "GET":
      try {
        const issue = await issueService.getOneIssue(issueKey);
        res.status(200).send(JSON.stringify(issue));
      } catch {
        res.status(404).end();
      }
      break;
    case "PUT":
      try {
        const newIssue = await issueService.editIssue(req, issueKey);
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.status(200).send(JSON.stringify(newIssue));
      } catch (e) {
        const err = e as Error;
        console.log(err);
        res.status(404).send(err.message);
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
