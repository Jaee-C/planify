import { NextApiRequest, NextApiResponse } from "next";
import Project from "@/server/service/Project";
import { JWT } from "next-auth/jwt";
import { getUserToken } from "@/lib/auth/session";
import { getServerUrlParam } from "@/lib/utils";
import { Issue } from "@/lib/types";
import { IssueRequest } from "@/server/service/Issue";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string | Issue>
): Promise<void> {
  const pKey: string = getServerUrlParam(req, "pKey");
  const issueKey: string = getServerUrlParam(req, "id");
  const token: JWT = await getUserToken(req);

  const project: Project = new Project(pKey, token.id);

  switch (req.method) {
    case "GET":
      try {
        const issue: Issue = await project.getIssue(issueKey);
        res.status(200).json(issue);
      } catch {
        res.status(404).end();
      }
      break;
    case "PUT":
      const issueRequest: IssueRequest = new IssueRequest();
      issueRequest.key = issueKey;
      issueRequest.title = req.body.title;
      issueRequest.description = req.body.description;
      issueRequest.status = req.body.status;
      await project.saveIssue(issueRequest);
      res.status(200).end(`UPDATE ${issueKey}`);
      break;
    case "DELETE":
      await project.deleteIssue(issueKey);
      res.status(200).send(`DELETE ${issueKey}`);
      break;
    default:
      res.status(405).end();
  }
}
