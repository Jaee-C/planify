import IssueRequest from "@/server/service/Issue/IssueRequest";
import { NextApiRequest } from "next";

export default class NextjsIssueRequest extends IssueRequest {
  public constructor(req: NextApiRequest) {
    super();
    if (req.body.title) this.title = req.body.title;
    if (req.body.description) this.title = req.body.description;
    super.saveStatus(parseInt(req.body.status));
    if (req.body.assignee) this.assignee = req.body.assignee;
    if (req.body.priority) this.priority = parseInt(req.body.priority);
  }
}
