import { Issue, IssueResponse, PriorityType, StatusType } from "lib/types";
import { IssueRequest } from "@/server/service/Issue";
import { FormValues } from "@/components/Form/FormConstants";

export function toStatusString(
  status: number | undefined,
  ref: StatusType[] | undefined
): string {
  if (!status || !ref) return "Invalid";

  return ref.filter((item: StatusType): boolean => item.id === status)[0].name;
}

export async function serverDeleteIssue(
  pKey: string,
  issueId: number | string
): Promise<void> {
  await fetch(`/api/${pKey}/issue/${issueId}`, { method: "DELETE" });
}

export async function fetchIssueList(pKey: string): Promise<IssueResponse> {
  if (pKey == undefined || Array.isArray(pKey)) {
    return { data: [] };
  }

  const httpResponse: Response = await fetch(`/api/${pKey}/issues`, {
    method: "GET",
  });

  if (!httpResponse.ok) {
    throw new Error(httpResponse.statusText);
  }

  const json = await httpResponse.json();
  const issues: Issue[] = json.data.map((item: any): Issue => {
    const newIssue: Issue = new Issue(item.id);

    newIssue.title = item.title;
    newIssue.status = item.status;
    newIssue.issueKey = item.issueKey;
    newIssue.priority = item.priority;

    return newIssue;
  });

  return { data: issues };
}

export async function fetchStatuses(projectKey: string): Promise<StatusType[]> {
  const httpResponse: Response = await fetch(`/api/${projectKey}/statuses`, {
    method: "GET",
  });

  if (!httpResponse.ok) {
    throw new Error(httpResponse.statusText);
  }

  const json = await httpResponse.json();
  const statuses: StatusType[] = json.map(
    (item: any): StatusType => ({ id: item.id, name: item.name })
  );

  return statuses;
}

export async function fetchPriorities(
  projectKey: string
): Promise<PriorityType[]> {
  const httpResponse: Response = await fetch(`/api/${projectKey}/priorities`, {
    method: "GET",
  });

  if (!httpResponse.ok) {
    throw new Error(httpResponse.statusText);
  }

  const json = await httpResponse.json();
  return json.map(
    (item: any): PriorityType => ({ id: item.id, name: item.name })
  );
}

export async function getIssue(
  projectKey: string,
  issueId: string
): Promise<Issue> {
  const httpResponse: Response = await fetch(
    `/api/${projectKey}/issue/${issueId}`,
    {
      method: "GET",
    }
  );

  if (!httpResponse.ok) {
    throw new Error(httpResponse.statusText);
  }

  const json = await httpResponse.json();
  const newIssue: Issue = new Issue(json.id);

  newIssue.title = json.title;
  newIssue.assignee = json.assignee;
  newIssue.description = json.description;
  newIssue.status = { id: json.status.id, name: json.status.name };
  newIssue.issueKey = json.issueKey;

  if (json.priority) {
    newIssue.priority = {
      id: json.priority.id,
      name: json.priority.name,
    };
  }

  return newIssue;
}

export async function addIssue(pKey: string, data: FormValues): Promise<any> {
  const httpResponse: Response = await fetch(`/api/${pKey}/issues`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!httpResponse.ok) {
    console.log(httpResponse.statusText);
  }

  const json = await httpResponse.json();

  return json.message;
}

export async function editIssue(
  pKey: string,
  issueKey: string,
  data: any
): Promise<any> {
  const httpResponse: Response = await fetch(`/api/${pKey}/issue/${issueKey}`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!httpResponse.ok) {
    console.log(httpResponse.statusText);
  }

  const json = await httpResponse.text();

  return json;
}
