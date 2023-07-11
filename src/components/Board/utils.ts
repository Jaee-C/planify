import { Issue, IssueResponse } from "@/lib/types";

export interface ColumnDefinition {
  name: string;
  order: number;
}

export function issueResponseToIssue(res: IssueResponse | undefined): Issue[] {
  if (!res) return [];

  return res.data;
}
