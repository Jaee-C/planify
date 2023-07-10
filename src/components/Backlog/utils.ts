import { Issue } from "@/lib/types";
import { GridRowsProp } from "@mui/x-data-grid";
import { NONE_PRIORITY } from "@/lib/constants";

export function createGridRowFromIssue(issue: Issue): GridRowsProp {
  return [
    {
      id: issue.id,
      key: issue.issueKey,
      title: issue.title,
      status: issue.status,
      priority: issue.priority ? issue.priority : NONE_PRIORITY,
    },
  ];
}
