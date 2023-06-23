import { ServerIssue } from "@/interfaces";

const AllIssues: ServerIssue[] = [
  createData(1, "PRJ", "Create PoC", "Daniel", 3),
  createData(2, "PRJ", "Raise Issues", "Daniel", 1),
  createData(3, "PRJ", "Update Progress on Issues", "Daniel", 2),
  createData(4, "PRJ", "Record all issues", "Daniel", 1),
  createData(5, "PRJ", "Manage Issues", "Daniel", 1),
  createData(6, "PRJ", "Notify users", "Daniel", 1),
];

export function saveIssue(req: ServerIssue): void {
  req.id = AllIssues.length + 1;
  AllIssues.push(req);
}

function fetchAllIssues(): ServerIssue[] {
  return AllIssues;
}

function deleteIssue(id: number): void {
  const index: number = AllIssues.findIndex(issue => issue.id === id);
  AllIssues.splice(index, 1);
}

function createData(
  id: number,
  project: string,
  title: string,
  assignee: string,
  status: number
): ServerIssue {
  return { id, project, title, assignee, status };
}

export default {
  fetchAllIssues,
  deleteIssue,
  saveIssue,
};
