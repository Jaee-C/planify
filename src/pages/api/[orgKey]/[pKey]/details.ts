import { NextApiRequest, NextApiResponse } from "next";
import { getQueryParam } from "@/server/utils";
import ProjectRepository, {
  UpdateProject,
} from "@/server/dao/ProjectRepository";
import { verifyOrgPermission } from "@/server/auth/permissions";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const project = getQueryParam(req, "pKey");
  const organisation = getQueryParam(req, "orgKey");

  if (project === "" || organisation === "") {
    res.status(405).end();
    return;
  }

  if (!(await verifyOrgPermission(req, res))) {
    return;
  }

  switch (req.method) {
    case "GET":
      res.setHeader("Content-Type", "application/json");
      try {
        const details = await ProjectRepository.getProjectDetails({
          project,
          organisation,
        });
        res.statusCode = 200;
        res.end(JSON.stringify(details));
      } catch (e) {
        const error = e as Error;
        res.statusCode = 500;
        res.end({ message: error.message });
      }
      break;
    case "PUT":
      try {
        const details = await ProjectRepository.updateProject(
          {
            project,
            organisation,
          },
          getProjectRequest(req)
        );
        res.statusCode = 200;
        res.end(details);
      } catch (e) {
        const error = e as Error;
        res.statusCode = 500;
        res.end({ message: error.message });
      }
      break;
    default:
      res.status(405).end();
  }
}

function getProjectRequest(req: NextApiRequest): UpdateProject {
  return {
    name: req.body.name,
    description: req.body.description,
    key: req.body.key,
    owner: req.body.owner,
  };
}
