import { NextApiRequest } from "next";
import { verifyUrlParam } from "@/lib/utils";

export function getUrlDynamicParam(req: NextApiRequest, key: string): string {
  const query: NextApiRequest["query"] = req.query;

  return verifyUrlParam(query[key]);
}

export function getUrlQueryParam(req: NextApiRequest, key: string): string {
  const searchParams = req.query;
  console.log(searchParams);

  const value = searchParams[key];

  return verifyUrlParam(value);
}
