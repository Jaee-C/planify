import { NextApiRequest, NextApiResponse } from "next";
import Project from "@/server/service/Project";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>
): void {
  const query: NextApiRequest["query"] = req.query;

  const project: Project = new Project(Number(query.pid));
  switch (req.method) {
    case "DELETE":
      project.deleteIssue(Number(query.id));
      res.status(200).send(`DELETE ${query.id}`);
      break;
    default:
      res.status(405).end();
  }
}
