import { NextApiRequest, NextApiResponse } from "next";
import { getServerUrlParam } from "@/lib/utils";
import StatusRepository from "@/server/domain/StatusRepository";
import { StatusType } from "@/lib/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const projectKey: string = getServerUrlParam(req, "pKey");
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
