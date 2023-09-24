import { NextApiRequest, NextApiResponse } from "next";
import { getQueryParam, getRequestBody } from "@/server/utils";
import OrganisationRepository from "@/server/dao/OrganisationRepository";
import UserRepository from "@/server/dao/UserRepository";
import { getUserToken } from "@/server/auth/session";
import { JWT } from "next-auth/jwt";
import { verifyOrgPermission } from "@/server/auth/permissions";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const organisation: string = getQueryParam(req, "orgKey");
  const userEmail: string = getRequestBody(req, "email");
  const token: JWT = await getUserToken(req);
  const ownEmail = token.email;

  if (organisation === "") {
    res.status(405).end();
    return;
  }

  if (!(await verifyOrgPermission(req, res))) {
    return;
  }

  try {
    switch (req.method) {
      case "GET":
        const users = await UserRepository.getAllUsers({ organisation });
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
        if (userEmail === ownEmail) {
          res.status(406).send({
            message: "User cannot remove themselves.",
          });
          return;
        }

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
