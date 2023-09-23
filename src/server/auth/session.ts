import { NextApiRequest } from "next";
import { getToken, JWT } from "next-auth/jwt";

/**
 * Returns the JWT token of a request. If a request is unauthenticated, a guest
 * token is returned.
 * @param req
 */
export async function getUserToken(req: NextApiRequest): Promise<JWT> {
  const token: JWT | null = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (token) {
    return token;
  }

  return {
    id: "1",
    name: "Guest",
  };
}
