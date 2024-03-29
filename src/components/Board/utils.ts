import { StatusType } from "@/lib/types";
import { Issue } from "@/lib/shared";
import { compareIssue } from "@/lib/shared/Issue";
import { DropResult } from "@hello-pangea/dnd";

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

  return issues
    .filter((issue: Issue) => issue.status?.id === status.id)
    .sort(compareIssue);
}

export function clientUpdateIssue(issues: Issue[], update: Issue): Issue[] {
  const updated = [...issues.filter(issue => issue.id !== update.id)];
  updated.push(update);
  return updated;
}

export function clientUpdateIssueStatus(
  editedIssueId: string,
  issues: Issue[],
  status: StatusType | undefined,
  issueBefore?: Issue,
  issueAfter?: Issue
): [Issue[], string] {
  const edited: Issue | undefined = issues.find(
    issue => String(issue.id) === editedIssueId
  );

  if (!edited) return [[...issues], ""];

  edited.status = status;

  if (issueBefore && issueAfter) {
    edited.placeBetween(issueBefore, issueAfter);
  } else if (issueBefore) {
    edited.placeAfter(issueBefore);
  } else if (issueAfter) {
    edited.placeBefore(issueAfter);
  } else {
    edited.initializeOrder();
  }
  const updated = [...issues.filter(issue => issue.id !== edited.id)];
  updated.push(edited);
  return [updated, edited.serialisedOrder!];
}

export function findIssueKeyById(issues: Issue[], id: string): string {
  const issue = issues.find(issue => String(issue.id) === id);
  return issue && issue.issueKey ? issue.issueKey : "";
}

export function findStatusTypeByName(
  allStatuses: StatusType[],
  name: string
): StatusType | undefined {
  return allStatuses.find(status => String(status.name) === name);
}

export function handleSameStatus(issues: Issue[], movedIssue: Issue): Issue[] {
  return removeOneIssue(issues, movedIssue);
}

export function removeOneIssue(allIssues: Issue[], value: Issue): Issue[] {
  const index = allIssues.indexOf(value);
  if (index > -1) {
    allIssues.splice(index, 1);
  }
  return allIssues;
}

export function isNotMoved(
  source: DropResult["source"],
  dest: DropResult["destination"]
): boolean {
  return (
    !dest ||
    (source.droppableId === dest.droppableId && source.index === dest.index)
  );
}
