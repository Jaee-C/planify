import { NextApiRequest } from "next";
import { verifyUrlParam } from "@/lib/utils";

export function getUrlParam(req: NextApiRequest, key: string): string {
  const param: NextApiRequest["body"] = req.body;

  return verifyUrlParam(param[key]);
}

export function getQueryParam(req: NextApiRequest, key: string): string {
  const query: NextApiRequest["query"] = req.query;

  return verifyUrlParam(query[key]);
}
