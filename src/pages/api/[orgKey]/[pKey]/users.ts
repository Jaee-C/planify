import { NextApiRequest, NextApiResponse } from "next";
import { getQueryParam } from "@/server/utils";
import ProjectRepository from "@/server/dao/ProjectRepository";
import UserRepository from "@/server/dao/UserRepository";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const project: string = getQueryParam(req, "pKey");
  const organisation: string = getQueryParam(req, "orgKey");

  if (project === "") {
    res.status(405).end();
    return;
  }

  switch (req.method) {
    case "GET":
      const users = await UserRepository.getAllUsers({
        organisation,
        project,
      });
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(users);
      break;
    case "POST":
      // Add user to project
      const { id } = req.body;
      const userId = Number(id);
      if (Number.isNaN(userId)) {
        res.status(400).end();
        return;
      }

      try {
        await ProjectRepository.addUserToProject(
          {
            project,
            organisation,
          },
          id
        );
        res.status(200).end();
      } catch (e) {
        if (e instanceof Error) {
          res.status(500).end(e.message);
        }
      }
      break;
    default:
      res.status(405).end();
      break;
  }
}
