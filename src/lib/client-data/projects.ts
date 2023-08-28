import { Project } from "lib/shared";
import { ProjectFormValues } from "@/components/Projects/FormConstants";
import { ProjectData } from "@/lib/types";

export async function fetchProjectList(org: string): Promise<ProjectData[]> {
  const httpResponse: Response = await fetch(`/api/${org}/projects`, {
    method: "GET",
  });

  if (!httpResponse.ok) {
    throw new Error(httpResponse.statusText);
  }

  const json: ProjectData[] = await httpResponse.json();
  return json;
}

export async function addProject(
  org: string,
  data: ProjectFormValues
): Promise<ProjectData> {
  const httpResponse: Response = await fetch(`/api/${org}/projects`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!httpResponse.ok) {
    throw new Error(httpResponse.statusText);
  }

  const json: ProjectData = await httpResponse.json();

  return json;
}

export async function getProjectDetails(
  org: string,
  key: string
): Promise<ProjectData> {
  if (key === "") {
    return new Project(-1);
  }
  const httpResponse: Response = await fetch(`/api/${org}/${key}/details`, {
    method: "GET",
  });

  if (!httpResponse.ok) {
    throw new Error(httpResponse.statusText);
  }

  const json: ProjectData = await httpResponse.json();

  return json;
}

export async function editProject(
  data: ProjectFormValues,
  org: string,
  key: string
): Promise<ProjectData> {
  const httpResponse: Response = await fetch(`/api/${org}/${key}/details`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!httpResponse.ok) {
    throw new Error(httpResponse.statusText);
  }

  const json: ProjectData = await httpResponse.json();
  return json;
}
