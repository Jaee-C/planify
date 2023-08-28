import { NextApiRequest, NextApiResponse } from "next";
import ProjectRepository, { NewProject } from "@/server/dao/ProjectRepository";
import { JWT } from "next-auth/jwt";
import { getUserToken } from "@/server/auth/session";
import { getUrlParam } from "@/server/utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string | undefined>
): Promise<void> {
  const organisation = getUrlParam(req, "orgKey");

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
  const name = getUrlParam(req, "name");
  const key = getUrlParam(req, "key");
  const description = getUrlParam(req, "description");
  const organisation = getUrlParam(req, "orgKey");

  const token: JWT = await getUserToken(req);
  const userId: string = token.id;

  return {
    name,
    key,
    description,
    owner: Number(userId),
    organisation,
  };
}
