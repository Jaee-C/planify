import { NextApiRequest } from "next";

export function getUrlParam(req: NextApiRequest, key: string): string {
  const query: NextApiRequest["query"] = req.query;

  return verifyUrlParam(query[key]);
}

export function verifyUrlParam(param: string | string[] | undefined): string {
  if (Array.isArray(param) || param === undefined) {
    return "";
  }
  return param;
}
