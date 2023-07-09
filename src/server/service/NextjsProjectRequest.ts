import ProjectRequest from "./ProjectRequest";
import { NextApiRequest } from "next";

export default class NextjsProjectRequest extends ProjectRequest {
  public constructor(req: NextApiRequest) {
    super();
    this.name = req.body.name;
    this.description = req.body.description;
    this.key = req.body.key;
  }
}
