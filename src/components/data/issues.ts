import { UIIssue } from "@/interfaces";
import { formValues, StatusType } from "@/components/Form/FormConstants";

function convertNumtoStatus(num: string): string {
  const status: number = parseInt(num);

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

export async function fetchIssueList(pid: number): Promise<UIIssue[]> {
  const httpResponse: Response = await fetch(`/api/${pid}/issues`, {
    method: "GET",
  });
  const projectResponse: Response = await fetch(`/api/${pid}/key`, {
    method: "GET",
  });

  if (!httpResponse.ok) {
    throw new Error(httpResponse.statusText);
  }
  if (!projectResponse.ok) {
    throw new Error(projectResponse.statusText);
  }

  const json = await httpResponse.json();
  return json.map((item: any): UIIssue => {
    return {
      id: item.id,
      key: item.key,
      title: item.title,
      assignee: item.assignee,
      status: parseInt(item.status),
    };
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

export function convertStatusToNum(status: string): StatusType | undefined {
  switch (status) {
    case "To Do":
      return 1;
    case "In Progress":
      return 2;
    case "Done":
      return 3;
    default:
      return undefined;
  }
}
