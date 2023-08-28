import { NextApiRequest, NextApiResponse } from "next";
import { getUrlParam } from "@/server/utils";
import OrganisationRepository from "@/server/dao/OrganisationRepository";
import UserRepository from "@/server/dao/UserRepository";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string | undefined>
): Promise<void> {
  const organisation: string = getUrlParam(req, "orgKey");
  const userEmail: string = getUrlParam(req, "newuser");

  if (organisation === "") {
    res.status(405).end();
    return;
  }

  try {
    switch (req.method) {
      case "GET":
        const users = UserRepository.getAllUsers({ organisation });
        res.status(200).end(users);
      case "POST":
        // Add new user to organisation
        await OrganisationRepository.addUserToOrganisation(
          userEmail,
          organisation
        );
        res.status(200).end();
        break;
      case "DELETE":
        await OrganisationRepository.removeUser(userEmail, organisation);
        res.status(200).end();
        break;
      default:
        res.status(405).end();
        return;
    }
  } catch (e) {
    if (e instanceof Error) {
      res.status(500).end(e.message);
    }
  }
}