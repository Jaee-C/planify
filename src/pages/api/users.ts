import { NextApiRequest, NextApiResponse } from "next";
import { IssueData } from "@/lib/types";
import { getUrlParam } from "@/server/utils";
import UserRepository from "@/server/dao/UserRepository";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const query = getUrlParam(req, "search");

  if (query.length <= 2) {
    res.status(200).end();
    return;
  }

  switch (req.method) {
    case "GET":
      const users = await UserRepository.searchUser(query);
      res.status(200).end(users);
      break;
    default:
      res.status(405).end();
  }
}
