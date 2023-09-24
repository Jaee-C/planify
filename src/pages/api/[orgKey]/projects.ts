import { NextApiRequest, NextApiResponse } from "next";
import ProjectRepository, { NewProject } from "@/server/dao/ProjectRepository";
import { JWT } from "next-auth/jwt";
import { getUserToken } from "@/server/auth/session";
import { getQueryParam, getRequestBody } from "@/server/utils";
import { verifyOrgPermission } from "@/server/auth/permissions";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string | undefined>
): Promise<void> {
  const organisation = getQueryParam(req, "orgKey");

  if (!(await verifyOrgPermission(req, res))) {
    return;
  }

  // Handle Request
  switch (req.method) {
    case "GET":
      const allProjects = await ProjectRepository.getAllProjects(organisation);
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(allProjects));
      break;
    case "POST":
      const projectDetails = await getNewProjectDetails(req);

      console.log(projectDetails);

      const createdProject = await ProjectRepository.createProject(
        projectDetails
      );
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(createdProject));
      break;
    default:
      res.statusCode = 405;
      res.end();
  }
}

async function getNewProjectDetails(req: NextApiRequest): Promise<NewProject> {
  const name = getRequestBody(req, "name");
  const key = getRequestBody(req, "key");
  const description = getRequestBody(req, "description");

  const organisation = getQueryParam(req, "orgKey");

  const token: JWT = await getUserToken(req);
  const userId: string = token.id;

  return {
    name,
    key,
    description,
    owner: userId,
    organisation,
  };
}
