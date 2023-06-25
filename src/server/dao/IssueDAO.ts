import { ServerIssue } from "@/interfaces";

const AllIssues: ServerIssue[] = [
  createData(1, "Create PoC", "Daniel", 3),
  createData(2, "Raise Issues", "Daniel", 1),
  createData(3, "Update Progress on Issues", "Daniel", 2),
  createData(4, "Record all issues", "Daniel", 1),
  createData(5, "Manage Issues", "Daniel", 1),
  createData(6, "Notify users", "Daniel", 1),
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
  title: string,
  assignee: string,
  status: number
): ServerIssue {
  return { id, title, assignee, status };
}

export default {
  fetchAllIssues,
  deleteIssue,
  saveIssue,
};
