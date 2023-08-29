import { NextApiRequest, NextApiResponse } from "next";
import OrganisationRepository from "@/server/dao/OrganisationRepository";
import { getQueryParam } from "@/server/utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const userId = getQueryParam(req, "user");

  if (userId === "") {
    res.status(404).end();
    return;
  }

  switch (req.method) {
    case "GET":
      console.log(userId);
      const org = await OrganisationRepository.getDefaultOrganisation(
        Number(userId)
      );

      res.status(200).end(JSON.stringify(org));
      break;
    default:
      res.status(405).end();
  }
}
