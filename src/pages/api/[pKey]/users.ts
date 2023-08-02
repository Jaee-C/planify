import { NextApiRequest, NextApiResponse } from "next";
import UsersService from "@/server/service/Users/UsersService";
import { getUserToken } from "@/server/auth/session";
import { getUrlParam } from "@/server/utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const projectKey: string = getUrlParam(req, "pKey");
  const token = await getUserToken(req);

  if (projectKey === "") {
    res.status(405).end();
    return;
  }

  const userService = new UsersService(projectKey, Number(token.id));

  switch (req.method) {
    case "GET":
      const users = await userService.fetchAllProjectUsers();
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
        await userService.addUserToProject(userId);
        res.status(200).end();
      } catch (e) {
        res.status(500).end();
      }
      break;
    default:
      res.status(405).end();
      break;
  }
}
