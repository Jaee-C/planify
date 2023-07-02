import { NextApiRequest, NextApiResponse } from "next";
import { Project } from "lib/types";
import ProjectRepository from "@/server/domain/ProjectRepository";
import { JWT } from "next-auth/jwt";
import { getUserToken } from "@/lib/auth/session";
import { IProjectDB } from "@/server/domain/interfaces";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Project[] | string | undefined>
): Promise<void> {
  const token: JWT = await getUserToken(req);
  const userId: string = token.id;
  const projectDb: IProjectDB = new ProjectRepository(userId);
  switch (req.method) {
    case "GET":
      const allProjects: Project[] = await projectDb.fetchAllProjects();
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(allProjects));
      break;
  }
}
