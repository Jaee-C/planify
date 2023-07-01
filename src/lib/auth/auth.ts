import Iron from "@hapi/iron";
import {
  MAX_AGE,
  setTokenCookie,
  getTokenCookie,
} from "@/lib/auth/auth-cookies";
import { NextApiRequest, NextApiResponse } from "next";

const TOKEN_SECRET: string = process.env.TOKEN_SECRET
  ? process.env.TOKEN_SECRET
  : "";

export async function setLoginSession(
  res: NextApiResponse,
  session: any
): Promise<void> {
  const createdAt: number = Date.now();
  // Create a session object with a max age that we can validate later
  const obj = { ...session, createdAt, maxAge: MAX_AGE };
  console.log(obj);
  const token: string = await Iron.seal(obj, TOKEN_SECRET, Iron.defaults);

  setTokenCookie(res, token);
}

export async function getLoginSession(req: NextApiRequest): Promise<any> {
  const token: string | undefined = getTokenCookie(req);

  if (!token) return;

  const session: any = await Iron.unseal(token, TOKEN_SECRET, Iron.defaults);

  const expiresAt: number = session.createdAt + session.maxAge * 1000;

  // Validate the expiration date of the session
  if (Date.now() > expiresAt) {
    throw new Error("Session expired");
  }

  return session;
}
