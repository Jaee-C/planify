import {
  Issue,
  IssueData,
  IssueFormValues,
  PriorityType,
  StatusType,
} from "lib/types";
import AppError from "@/server/service/AppError";
import { convertDataToIssue } from "@/lib/shared/Issue";

export function toStatusString(
  status: number | undefined,
  ref: StatusType[] | undefined
): string {
  if (!status || !ref) return "Invalid";

  return ref.filter((item: StatusType): boolean => item.id === status)[0].name;
}

export async function serverDeleteIssue(
  organisation: string,
  pKey: string,
  issueKey: string
): Promise<string> {
  await fetch(`/api/${organisation}/${pKey}/issue/${issueKey}`, {
    method: "DELETE",
  });
  return issueKey;
}

export async function fetchIssueList(
  org: string,
  pKey: string
): Promise<IssueData[]> {
  if (pKey == undefined || Array.isArray(pKey)) {
    return [];
  }

  const httpResponse: Response = await fetch(`/api/${org}/${pKey}/issues`, {
    method: "GET",
  });

  if (!httpResponse.ok) {
    throw new Error(httpResponse.statusText);
  }

  const json = await httpResponse.json();
  return json.map(
    (item: any): IssueData => ({
      id: item.id,
      title: item.title,
      status: item.status,
      issueKey: item.issueKey,
      priority: item.priority,
      order: item.order,
    })
  );
}

export async function fetchStatuses(
  organisation: string,
  projectKey: string
): Promise<StatusType[]> {
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
  organisation: string,
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
  organisation: string,
  projectKey: string,
  issueId: string
): Promise<Issue> {
  const httpResponse: Response = await fetch(
    `/api/${organisation}/${projectKey}/issue/${issueId}`,
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

export async function addIssue(
  organisation: string,
  pKey: string,
  data: IssueFormValues
): Promise<any> {
  const httpResponse: Response = await fetch(
    `/api/${organisation}/${pKey}/issues`,
    {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

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
  organisation: string,
  pKey: string,
  issueKey: string,
  data: any
): Promise<any> {
  const httpResponse: Response = await fetch(
    `/api/${organisation}/${pKey}/issue/${issueKey}`,
    {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  const json = await httpResponse.json();

  if (!httpResponse.ok) {
    if (json.code && json.message) {
      throw new AppError(json.code, json.message);
    }
  }

  const jsonData: IssueData = json.data;
  return convertDataToIssue(jsonData);
}
