import { formValues } from "@/components/Form/FormConstants";
import Issue from "@/interfaces/Issue";

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

export async function fetchIssueList(pid: number): Promise<Issue[]> {
  const httpResponse: Response = await fetch(`/api/${pid}/issues`, {
    method: "GET",
  });

  if (!httpResponse.ok) {
    throw new Error(httpResponse.statusText);
  }

  const json = await httpResponse.json();
  return json.map((item: any): Issue => {
    const newIssue: Issue = new Issue(item.id);

    newIssue.title = item.title;
    newIssue.assignee = item.assignee;
    newIssue.status = item.status;
    newIssue.issueKey = item.issueKey;

    return newIssue;
  });
}

export async function addIssue(data: formValues): Promise<any> {
  const httpResponse: Response = await fetch("/api/issues", {
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
