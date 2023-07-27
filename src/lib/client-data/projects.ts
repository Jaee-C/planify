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

    newProject.name = item._name;
    newProject.key = item._key;
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

export async function getProjectDetails(key: string): Promise<Project> {
  if (key === "") {
    return new Project(-1);
  }
  const httpResponse: Response = await fetch(`/api/${key}/details`, {
    method: "GET",
  });

  if (!httpResponse.ok) {
    throw new Error(httpResponse.statusText);
  }

  const json = await httpResponse.json();
  const project: Project = new Project(json.id);

  project.name = json.name;
  project.key = json.key;

  return project;
}

export async function editProject(
  data: ProjectFormValues,
  key: string
): Promise<any> {
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

  const json = await httpResponse.json();
  return json.message;
}
