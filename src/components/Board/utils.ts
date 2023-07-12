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
