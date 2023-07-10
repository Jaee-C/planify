import { Issue, IssueResponse, PriorityType, StatusType } from "lib/types";
import { FormValues } from "@/components/CreateIssue/FormConstants";
import AppError from "@/server/service/AppError";

export function toStatusString(
  status: number | undefined,
  ref: StatusType[] | undefined
): string {
  if (!status || !ref) return "Invalid";

  return ref.filter((item: StatusType): boolean => item.id === status)[0].name;
}

export async function serverDeleteIssue(
  pKey: string,
  issueKey: string
): Promise<string> {
  await fetch(`/api/${pKey}/issue/${issueKey}`, { method: "DELETE" });
  return issueKey;
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

  const json = await httpResponse.json();
  if (!httpResponse.ok) {
    if (json.message && json.code) {
      throw new AppError(json.code, json.message);
    }
  }

  const jsonData = json.data[0];
  const newIssue: Issue = new Issue(jsonData.id);
  newIssue.title = jsonData.title;
  newIssue.status = jsonData.status;
  newIssue.issueKey = jsonData.issueKey;
  newIssue.priority = jsonData.priority;
  return newIssue;
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

  const json = await httpResponse.json();

  if (!httpResponse.ok) {
    if (json.code && json.message) {
      throw new AppError(json.code, json.message);
    }
  }

  const jsonData = json.data[0];
  const newIssue: Issue = new Issue(jsonData.id);
  newIssue.title = jsonData.title;
  newIssue.status = jsonData.status;
  newIssue.issueKey = jsonData.issueKey;
  newIssue.priority = jsonData.priority;

  return newIssue;
}
