import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/dao/prisma";
import { Project } from "@/lib/types";
import { IProjectDB } from "./interfaces";
import ProjectRequest from "@/lib/service/ProjectRequest";

const projectSelect = {
  id: true,
  name: true,
  key: true,
} satisfies Prisma.ProjectSelect;

type ProjectPayload = Prisma.ProjectGetPayload<{
  select: typeof projectSelect;
}>;

export default class ProjectRepository implements IProjectDB {
  private readonly _userId: string;

  public constructor(user: string) {
    this._userId = user;
  }

  public async fetchAllProjects(): Promise<Project[]> {
    const dbProjects: ProjectPayload[] = await prisma.project.findMany({
      select: projectSelect,
      where: {
        ownerId: Number(this._userId),
      },
    });

    return dbProjects.map(
      (dbProject: ProjectPayload): Project => this.convertToProject(dbProject)
    );
  }

  public async saveProject(req: ProjectRequest): Promise<Project> {
    if (!req.isValidRequest()) {
      throw new Error("Invalid request");
    }

    const dbProject: ProjectPayload = await prisma.project.create({
      // @ts-ignore
      data: this.createProject(req.name, req.key, req.ownerId, req.description),
      select: projectSelect,
    });

    return this.convertToProject(dbProject);
  }

  private convertToProject(dbProject: ProjectPayload): Project {
    return {
      id: dbProject.id,
      name: dbProject.name,
      key: dbProject.key,
    };
  }

  private createProject(
    name: string,
    key: string,
    ownerId: number,
    description?: string
  ): Prisma.ProjectCreateInput {
    return {
      name,
      key,
      description,
      owner: {
        connect: {
          id: ownerId,
        },
      },
    };
  }
}
