import { NextApiRequest } from "next";
import { ServerIssue } from "@/interfaces";
import IssueDAO from "@/dao/IssueDAO";

export interface IssueRequest {
  title?: string;
  description?: string;
  status?: number;
  assignee?: string;
}

export function createIssueRequest(req: NextApiRequest): IssueRequest {
  const res: IssueRequest = {};

  if (req.body.title) res.title = req.body.title;
  if (req.body.description) res.description = req.body.description;
  if (req.body.status && verifyStatus(req.body.status))
    res.status = req.body.status;
  if (req.body.assignee) res.assignee = req.body.assignee;

  return res;
}

function createIssue(req: IssueRequest): ServerIssue {
  return {
    id: 0,
    project: "PRJ",
    title: req.title || "New Issue",
    assignee: req.assignee || "Daniel",
    status: req.status || 1,
  };
}

export function addIssue(req: IssueRequest) {
  const newIssue: ServerIssue = createIssue(req);
  IssueDAO.saveIssue(newIssue);
}

export function deleteIssue(id: number): void {
  IssueDAO.deleteIssue(id);
}

export function getAllIssues(): ServerIssue[] | string {
  return IssueDAO.fetchAllIssues();
}

function verifyStatus(req: string): boolean {
  const status: number = parseInt(req);

  if (Number.isNaN(status)) {
    console.log("Status is not a number.");
    return false;
  }

  return status == 1 || status == 2 || status == 3;
}
