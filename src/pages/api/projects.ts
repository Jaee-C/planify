import { NextApiRequest, NextApiResponse } from "next";
import { Project } from "@/interfaces";
import ProjectRepository from "@/server/domain/ProjectRepository";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Project[] | string | undefined>
): Promise<void> {
  const projectDb: ProjectRepository = new ProjectRepository();
  switch (req.method) {
    case "GET":
      const allProjects: Project[] = await projectDb.fetchAllProjects();
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(allProjects));
      break;
  }
}
