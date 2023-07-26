import { NextApiRequest, NextApiResponse } from "next";
import { IssueResponse, Project } from "@/lib/shared";
import ProjectService from "@/lib/service/ProjectService";
import { getServerUrlParam } from "@/lib/utils";
import { JWT } from "next-auth/jwt";
import { getUserToken } from "@/lib/auth/session";

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

  const project: ProjectService = new ProjectService(projectKey, userId);
  switch (req.method) {
    case "GET":
      res.setHeader("Content-Type", "application/json");
      try {
        const details: Project = await project.getProjectDetails();
        res.statusCode = 200;
        res.end(details.toJSONString());
      } catch (e) {
        const error = e as Error;
        res.statusCode = 500;
        res.end({ message: error.message });
      }
      break;
    default:
      res.status(405).end();
  }
}
