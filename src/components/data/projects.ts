import { Project } from "@/interfaces";

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

    return newProject;
  });
}
