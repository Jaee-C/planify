import { NextApiRequest, NextApiResponse } from "next";
import { UserData } from "@/lib/types";
import { getUrlParam } from "@/server/utils";
import { getUserToken } from "@/server/auth/session";
import UserRepository from "@/server/dao/UserRepository";

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

  const email = getUrlParam(req, "query");

  if (email.length === 0) {
    res.status(405).end();
    return;
  }

  switch (req.method) {
    case "GET":
      if (email.length < 2) {
        res.status(200).json([]);
        return;
      }
      const result = await UserRepository.searchUser(email);
      res.status(200).json(result);
      break;
    default:
      res.status(405).end();
      break;
  }
}
