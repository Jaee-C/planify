import { NextApiRequest, NextApiResponse } from "next";
import { Project } from "@/interfaces";
import ProjectRepository from "@/server/domain/ProjectRepository";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Project[] | string | undefined>
): Promise<void> {
  return new Promise(resolve => {
    const projectDb: ProjectRepository = new ProjectRepository();
    switch (req.method) {
      case "GET":
        projectDb.fetchAllProjects().then((projects: Project[]): void => {
          res.status(200).json(projects);
          resolve();
        });
        break;
    }
  });
}
