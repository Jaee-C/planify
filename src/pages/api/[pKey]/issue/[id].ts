import { NextApiRequest, NextApiResponse } from "next";
import { JWT } from "next-auth/jwt";
import { getUserToken } from "@/lib/auth/session";
import { getServerUrlParam } from "@/lib/utils";
import { Issue, IssueResponse } from "@/lib/shared";
import {
  createIssueRequest,
  IssueRequest,
  IssueService,
} from "@/lib/service/Issue";
import AppError from "@/lib/service/AppError";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string | Issue>
): Promise<void> {
  const pKey: string = getServerUrlParam(req, "pKey");
  const issueKey: string = getServerUrlParam(req, "id");
  const token: JWT = await getUserToken(req);

  const issueService: IssueService = new IssueService(pKey, token.id);

  switch (req.method) {
    case "GET":
      try {
        const issue: Issue = await issueService.getIssue(issueKey);
        res.status(200).json(issue);
      } catch {
        res.status(404).end();
      }
      break;
    case "PUT":
      const issueRequest: IssueRequest = createIssueRequest(req);
      issueRequest.key = issueKey;
      try {
        const newIssue: Issue = await issueService.editIssue(issueRequest);
        const response: IssueResponse = new IssueResponse([newIssue]);
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.status(200).send(response.toJSONString());
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
