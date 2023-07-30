import { NextApiRequest, NextApiResponse } from "next";
import { JWT } from "next-auth/jwt";
import { getUserToken } from "@/server/auth/session";
import { Issue } from "@/lib/shared";
import {
  createIssueRequest,
  IssueRequest,
  IssueService,
} from "@/server/service/Issue";
import AppError from "@/server/service/AppError";
import { IssueData } from "@/lib/types";
import { getUrlDynamicParam } from "@/server/utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string | IssueData>
): Promise<void> {
  const pKey: string = getUrlDynamicParam(req, "pKey");
  const issueKey: string = getUrlDynamicParam(req, "id");
  const token: JWT = await getUserToken(req);

  const issueService: IssueService = new IssueService(pKey, token.id);

  switch (req.method) {
    case "GET":
      try {
        const issue: Issue = await issueService.getIssue(issueKey);
        res.status(200).json(issue.serialiseToData());
      } catch {
        res.status(404).end();
      }
      break;
    case "PUT":
      const issueRequest: IssueRequest = createIssueRequest(req);
      issueRequest.key = issueKey;
      try {
        const newIssue: Issue = await issueService.editIssue(issueRequest);
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.status(200).send(newIssue.serialiseToData());
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
