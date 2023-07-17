import IssueRequest, {
  IssueFormValues,
} from "@/lib/service/Issue/IssueRequest";
import { NextApiRequest } from "next";

export default function createIssueRequest(req: NextApiRequest): IssueRequest {
  const form: IssueFormValues = {
    title: req.body.title,
    description: req.body.description,
    status: parseInt(req.body.status),
    priority: parseInt(req.body.priority),
  };
  const newRequest = new IssueRequest(form);

  if (req.body.order) {
    newRequest.order = req.body.order;
  }

  return newRequest;
}
