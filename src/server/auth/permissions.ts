import OrganisationRepository from "@/server/dao/OrganisationRepository";
import { NextApiRequest, NextApiResponse } from "next";
import { getUserToken } from "@/server/auth/session";
import { getQueryParam } from "@/server/utils";

export async function verifyOrgPermission(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<boolean> {
  const token = await getUserToken(req);
  const email = token.email ?? "";
  const organisation = getQueryParam(req, "orgKey");

  if (organisation.length === 0) {
    res.status(400).json({ message: "Organisation not found" });
    return false;
  }

  const hasPermission = await userHasOrgPermission(email, organisation);
  if (!hasPermission) {
    res.status(403).json({ message: "User does not have permission" });
    return false;
  }
  return true;
}

export async function verifyProjectPermission(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<boolean> {
  return true;
}

async function userHasOrgPermission(
  email: string,
  organisation: string
): Promise<boolean> {
  const users = await OrganisationRepository.findUsers(email, organisation);

  const result = users.filter(user => user.email === email);

  return result.length > 0;
}
