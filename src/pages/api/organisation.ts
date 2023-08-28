import { NextApiRequest, NextApiResponse } from "next";
import { IssueData } from "@/lib/types";
import OrganisationRepository, {
  NewOrganisation,
} from "@/server/dao/OrganisationRepository";
import { getUrlParam } from "@/server/utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IssueData[] | IssueData | undefined>
): Promise<void> {
  switch (req.method) {
    case "POST":
      try {
        const email = getUrlParam(req, "user");
        const orgDetails = getOrgParam(req);
        await OrganisationRepository.createOrganisation(email, orgDetails);
        res.status(200).end();
      } catch (e) {
        const err = e as Error;
        res.status(500).end(err.message);
      }
      break;
    default:
      res.status(405).end();
  }
}

function getOrgParam(req: NextApiRequest): NewOrganisation {
  const orgName = getUrlParam(req, "name");
  const key = getUrlParam(req, "key");

  return {
    name: orgName,
    key,
  };
}
