import { NextApiRequest, NextApiResponse } from "next";
import { getServerUrlParam } from "@/lib/utils";
import { PriorityType } from "@/lib/types";
import PriorityRepository from "@/lib/dao/PriorityRepository";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const projectKey: string = getServerUrlParam(req, "pKey");
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
