import { Issue, StatusType } from "@/lib/types";

export interface ColumnDefinition {
  name: string;
  order: number;
  status: StatusType;
}

export function getIssuesByStatus(
  issues: Issue[] | undefined,
  status: StatusType
): Issue[] {
  if (!issues) return [];

  return issues.filter((issue: Issue) => issue.status?.id === status.id);
}

export function updateIssueStatus(
  editedIssueId: string,
  issues: Issue[],
  status: StatusType | undefined
): Issue[] {
  const edited: Issue | undefined = issues.find(
    issue => String(issue.id) === editedIssueId
  );

  if (!edited) return [...issues];

  edited.status = status;
  const updated = [...issues.filter(issue => issue.id !== edited.id)];
  updated.push(edited);
  return updated;
}

export function findIssueKeyById(issues: Issue[], id: string): string {
  const issue = issues.find(issue => String(issue.id) === id);
  return issue && issue.issueKey ? issue.issueKey : "";
}
