import { Prisma } from "@prisma/client";
import { prisma } from "@/server/domain/prisma";
import { Project } from "lib/interfaces";

const projectSelect = {
  id: true,
  name: true,
  key: true,
} satisfies Prisma.ProjectSelect;

type ProjectPayload = Prisma.ProjectGetPayload<{
  select: typeof projectSelect;
}>;

export default class ProjectRepository {
  public async fetchAllProjects(): Promise<Project[]> {
    const dbProjects: ProjectPayload[] = await prisma.project.findMany({
      select: projectSelect,
    });

    return dbProjects.map(
      (dbProject: ProjectPayload): Project => this.convertToProject(dbProject)
    );
  }

  private convertToProject(dbProject: ProjectPayload): Project {
    return {
      id: dbProject.id,
      name: dbProject.name,
      key: dbProject.key,
    };
  }
}
