import { NextApiRequest } from "next";
import { verifyUrlParam } from "@/lib/utils";

export function getUrlParam(req: NextApiRequest, key: string): string {
  const query: NextApiRequest["query"] = req.query;

  return verifyUrlParam(query[key]);
}
