import { NextApiRequest, NextApiResponse } from "next";
import StatusRepository from "@/server/dao/StatusRepository";
import { StatusType } from "@/lib/types";
import { getUrlDynamicParam } from "@/server/utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const projectKey: string = getUrlDynamicParam(req, "pKey");
  const status: StatusRepository = new StatusRepository(projectKey);

  if (req.method === "GET") {
    const statuses: StatusType[] = await status.fetchStatuses();
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(statuses));
    return;
  }

  res.status(405).end();
}
