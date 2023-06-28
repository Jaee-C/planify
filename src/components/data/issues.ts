import Issue, { IssueResponse } from "@/interfaces/Issue";
import { StatusType } from "@/interfaces";

export function convertNumtoStatus(status: number | undefined): string {
  if (!status) return "Invalid";

  switch (status) {
    case 1:
      return "To Do";
    case 2:
      return "In Progress";
    case 3:
      return "Done";
    default:
      return "Invalid";
  }
}

export async function serverDeleteIssue(
  pid: number,
  issueId: number | string
): Promise<void> {
  await fetch(`/api/${pid}/issue/${issueId}`, { method: "DELETE" });
}

export async function fetchIssueList(pid: number): Promise<IssueResponse> {
  const httpResponse: Response = await fetch(`/api/${pid}/issues`, {
    method: "GET",
  });

  if (!httpResponse.ok) {
    throw new Error(httpResponse.statusText);
  }

  const json = await httpResponse.json();
  const issues: Issue[] = json.data.map((item: any): Issue => {
    const newIssue: Issue = new Issue(item.id);

    newIssue.title = item.title;
    newIssue.assignee = item.assignee;
    newIssue.status = item.status;
    newIssue.issueKey = item.issueKey;

    return newIssue;
  });
  const statuses: StatusType[] = json.statuses.map((item: any): StatusType => {
    const newStatus: StatusType = new StatusType(item.id, item.status);

    return newStatus;
  });

  return new IssueResponse(issues, statuses);
}

export async function addIssue(pid: number, data: Issue): Promise<any> {
  const httpResponse: Response = await fetch(`/api/${pid}/issues`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!httpResponse.ok) {
    console.log(httpResponse.statusText);
  }

  return httpResponse.json();
}
