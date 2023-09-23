import { NextApiRequest, NextApiResponse } from "next";
import { getQueryParam, getRequestBody } from "@/server/utils";
import OrganisationRepository from "@/server/dao/OrganisationRepository";
import UserRepository from "@/server/dao/UserRepository";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const organisation: string = getQueryParam(req, "orgKey");
  const userEmail: string = getRequestBody(req, "newuser");

  if (organisation === "") {
    res.status(405).end();
    return;
  }

  try {
    switch (req.method) {
      case "GET":
        const users = await UserRepository.getAllUsers({ organisation });
        console.log(JSON.stringify(users));
        res.setHeader("Content-Type", "application/json");
        res.status(200).end(JSON.stringify(users));
        break;
      case "POST":
        // Add new user to organisation
        try {
          await OrganisationRepository.addUserToOrganisation(
            userEmail,
            organisation
          );
          res.status(200).end();
        } catch (e) {
          console.error(e);
          res.status(500).end();
        }
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
