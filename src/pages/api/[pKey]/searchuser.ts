import { NextApiRequest, NextApiResponse } from "next";
import UsersService from "@/server/service/Users/UsersService";
import { UserData } from "@/lib/types";
import { getUrlParam } from "@/server/utils";
import { getUserToken } from "@/server/auth/session";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UserData[]>
): Promise<void> {
  const projectKey: string = getUrlParam(req, "pKey");
  const token = await getUserToken(req);

  if (projectKey === "") {
    res.status(405).end();
    return;
  }

  const userService = new UsersService(projectKey, Number(token.id));
  const username = getUrlParam(req, "username");

  if (username.length === 0) {
    res.status(405).end();
    return;
  }

  switch (req.method) {
    case "GET":
      if (username.length < 2) {
        res.status(200).json([]);
        return;
      }
      const result = await userService.searchUsersByUsername(username);
      res.status(200).json(result);
      break;
    default:
      res.status(405).end();
      break;
  }
}
