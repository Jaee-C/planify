import { NextApiRequest, NextApiResponse } from "next";
import UsersService from "@/server/service/Users/UsersService";
import { getUserToken } from "@/server/auth/session";
import { getUrlDynamicParam } from "@/server/utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const projectKey: string = getUrlDynamicParam(req, "pKey");
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
    default:
      res.status(405).end();
      break;
  }
}
