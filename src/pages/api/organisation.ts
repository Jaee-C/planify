import { NextApiRequest, NextApiResponse } from "next";
import OrganisationRepository, {
  NewOrganisation,
} from "@/server/dao/OrganisationRepository";
import { getRequestBody } from "@/server/utils";
import { getUserToken } from "@/server/auth/session";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const token = await getUserToken(req);
  const userId = token.id;

  switch (req.method) {
    case "GET":
      try {
        const orgs = await OrganisationRepository.getAllOrganisations(userId);
        res.status(200).send(JSON.stringify(orgs));
      } catch (e) {
        const err = e as Error;
        res.status(500).end(JSON.stringify(err.message));
      }
    case "POST":
      try {
        const email = getRequestBody(req, "user");
        const orgDetails = getOrgParam(req);
        await OrganisationRepository.createOrganisation(email, orgDetails);
        res.status(200).end();
      } catch (e) {
        const err = e as Error;
        res.status(500).end(JSON.stringify(err.message));
      }
      break;
    default:
      res.status(405).end();
  }
}

function getOrgParam(req: NextApiRequest): NewOrganisation {
  const orgName = getRequestBody(req, "name");
  const key = getRequestBody(req, "key");

  return {
    name: orgName,
    key,
  };
}
