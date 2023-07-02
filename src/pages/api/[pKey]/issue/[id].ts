import { NextApiRequest, NextApiResponse } from "next";
import Project from "@/server/service/Project";
import { JWT } from "next-auth/jwt";
import { getUserToken } from "@/lib/auth/session";
import { getUrlParam } from "@/lib/utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>
): Promise<void> {
  const pKey: string = getUrlParam(req, "pKey");
  const issueId: string = getUrlParam(req, "id");
  const token: JWT = await getUserToken(req);

  const project: Project = new Project(pKey, token.id);
  switch (req.method) {
    case "DELETE":
      project.deleteIssue(Number(issueId));
      res.status(200).send(`DELETE ${issueId}`);
      break;
    default:
      res.status(405).end();
  }
}
