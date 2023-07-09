import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession, NextAuthOptions, Session } from "next-auth";
import { getToken, JWT } from "next-auth/jwt";

export async function getUserSession(
  req: NextApiRequest,
  res: NextApiResponse,
  authOptions: NextAuthOptions
): Promise<Session> {
  const session: Session | null = await getServerSession(req, res, authOptions);

  if (session) {
    return session;
  }

  return {
    user: {
      name: "Guest",
    },
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toString(),
  };
}

/**
 * Returns the JWT token of a request. If a request is unauthenticated, a guest
 * token is returned.
 * @param req
 */
export async function getUserToken(req: NextApiRequest): Promise<JWT> {
  const token: JWT | null = await getToken({ req });

  if (token) {
    return token;
  }

  return {
    id: "-1",
    name: "Guest",
  };
}
