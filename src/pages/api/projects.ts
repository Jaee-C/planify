import { NextApiRequest, NextApiResponse } from "next";
import { Project } from "lib/types";
import ProjectRepository from "@/server/domain/ProjectRepository";
import { JWT } from "next-auth/jwt";
import { getUserToken } from "@/lib/auth/session";
import { IProjectDB } from "@/server/domain/interfaces";
import ProjectRequest from "@/server/service/ProjectRequest";
import NextjsProjectRequest from "@/server/service/NextjsProjectRequest";
import AppError from "@/server/service/AppError";
import { INVALID_TOKEN } from "@/lib/data/errors";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Project[] | string | undefined>
): Promise<void> {
  const token: JWT = await getUserToken(req);
  const userId: string = token.id;
  const projectDb: IProjectDB = new ProjectRepository(userId);

  if (Number.isNaN(Number(userId))) {
    res.statusCode = 401;
    const error: AppError = new AppError(INVALID_TOKEN, "Invalid token");
    res.end(error.toJSONString());
    return;
  }

  // Handle Request
  switch (req.method) {
    case "GET":
      const allProjects: Project[] = await projectDb.fetchAllProjects();
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(allProjects));
      break;
    case "POST":
      const projectRequest: ProjectRequest = new NextjsProjectRequest(req);
      projectRequest.ownerId = Number(userId);

      try {
        projectRequest.isValidRequest();
      } catch (e) {
        if (e instanceof AppError) {
          res.statusCode = 400;
          res.end(e.toJSONString());
          return;
        }
      }

      const createdProject: Project = await projectDb.saveProject(
        projectRequest
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
