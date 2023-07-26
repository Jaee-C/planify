import { NextApiRequest } from "next";
import { ParsedUrlQuery } from "querystring";

export function getServerUrlParam(req: NextApiRequest, key: string): string {
  const query: NextApiRequest["query"] = req.query;

  return verifyUrlParam(query[key]);
}

export function verifyUrlParam(param: string | string[] | undefined): string {
  if (Array.isArray(param) || param === undefined) {
    return "";
  }
  return param;
}

export function serverOnly(): void {
  if (typeof window !== "undefined") {
    throw new Error("this class should only be used on the server");
  }
}
