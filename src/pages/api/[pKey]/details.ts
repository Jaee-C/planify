import { NextApiRequest, NextApiResponse } from "next";
import { Project } from "@/lib/shared";
import ProjectService from "@/server/service/ProjectService";
import { JWT } from "next-auth/jwt";
import { getUserToken } from "@/server/auth/session";
import ProjectRequest from "@/server/service/ProjectRequest";
import NextjsProjectRequest from "@/server/service/NextjsProjectRequest";
import { ProjectData } from "@/lib/types";
import { getUrlDynamicParam } from "@/server/utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ProjectData | undefined>
): Promise<void> {
  const projectKey: string = getUrlDynamicParam(req, "pKey");

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
        res.end(details.serialiseToData());
      } catch (e) {
        const error = e as Error;
        res.statusCode = 500;
        res.end({ message: error.message });
      }
      break;
    case "PUT":
      try {
        const editRequest: ProjectRequest = new NextjsProjectRequest(req);
        const details: Project = await project.updateProjectDetails(
          editRequest,
          projectKey
        );
        res.statusCode = 200;
        res.end(details.serialiseToData());
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
