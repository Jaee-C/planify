import { NextApiRequest, NextApiResponse } from "next";
import UsersService from "@/server/service/Users/UsersService";
import { UserData } from "@/lib/types";
import { getUrlQueryParam } from "@/server/utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UserData[]>
): Promise<void> {
  const username = getUrlQueryParam(req, "username");

  if (username.length === 0) {
    res.status(405).end();
    return;
  }

  const userService = new UsersService();

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
