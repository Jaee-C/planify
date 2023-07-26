import { Project } from "lib/shared";
import { ProjectFormValues } from "@/components/Projects/FormConstants";

export async function fetchProjectList(): Promise<Project[]> {
  const httpResponse: Response = await fetch("/api/projects", {
    method: "GET",
  });

  if (!httpResponse.ok) {
    throw new Error(httpResponse.statusText);
  }

  const json = await httpResponse.json();
  return json.map((item: any): Project => {
    const newProject: Project = new Project(item.id);

    newProject.name = item.name;
    newProject.key = item.key;
    newProject.ownerName = item.owner?.name;

    return newProject;
  });
}

export async function addProject(data: ProjectFormValues): Promise<any> {
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

  const json = await httpResponse.json();

  return json.message;
}
