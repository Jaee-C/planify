import { Project } from "lib/shared";
import { ProjectFormValues } from "@/components/Projects/FormConstants";
import { ProjectData } from "@/lib/types";

export async function fetchProjectList(): Promise<ProjectData[]> {
  const httpResponse: Response = await fetch("/api/projects", {
    method: "GET",
  });

  if (!httpResponse.ok) {
    throw new Error(httpResponse.statusText);
  }

  const json: ProjectData[] = await httpResponse.json();
  return json;
}

export async function addProject(
  data: ProjectFormValues
): Promise<ProjectData> {
  const httpResponse: Response = await fetch("/api/projects", {
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

export async function getProjectDetails(key: string): Promise<ProjectData> {
  if (key === "") {
    return new Project(-1);
  }
  const httpResponse: Response = await fetch(`/api/${key}/details`, {
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
  key: string
): Promise<ProjectData> {
  const httpResponse: Response = await fetch(`/api/${key}/details`, {
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
