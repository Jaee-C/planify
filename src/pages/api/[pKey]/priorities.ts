import { NextApiRequest, NextApiResponse } from "next";
import { PriorityType } from "@/lib/types";
import PriorityRepository from "@/server/dao/PriorityRepository";
import { getUrlDynamicParam } from "@/server/utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const projectKey: string = getUrlDynamicParam(req, "pKey");
  const priority: PriorityRepository = new PriorityRepository(projectKey);

  if (req.method === "GET") {
    const priorities: PriorityType[] = await priority.fetchPriorities();
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(priorities));
    return;
  }

  res.status(405).end();
}
