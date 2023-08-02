import { Prisma } from "@prisma/client";
import { prisma } from "@/server/dao/prisma";
import { Project } from "@/lib/shared";
import { IProjectDB } from "./interfaces";
import ProjectRequest from "@/server/service/ProjectRequest";

const projectSelect = {
  id: true,
  name: true,
  key: true,
  owner: {
    select: {
      displayName: true,
    },
  },
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
      data: this.createProjectPayload(req),
      select: projectSelect,
    });

    return this.convertToProject(dbProject);
  }

  public async getDetails(key: string): Promise<Project> {
    const dbProject: ProjectPayload | null = await prisma.project.findUnique({
      where: {
        key_ownerId: {
          key,
          ownerId: Number(this._userId),
        },
      },
      select: projectSelect,
    });

    if (!dbProject) {
      throw new Error("Project not found");
    }

    return this.convertToProject(dbProject);
  }

  public async editProject(req: ProjectRequest, key: string): Promise<Project> {
    if (!req.isValidRequest()) {
      throw new Error("Invalid request");
    }

    try {
      const dbProject: ProjectPayload | null = await prisma.project.update({
        where: {
          key_ownerId: {
            key: key,
            ownerId: Number(this._userId),
          },
        },
        data: this.createEditPayload(req),
        select: projectSelect,
      });
      if (!dbProject) {
        throw new Error("Project not found");
      }
      return this.convertToProject(dbProject);
    } catch (e) {
      throw e;
    }
  }

  private convertToProject(dbProject: ProjectPayload): Project {
    const newProject: Project = new Project(dbProject.id);
    newProject.name = dbProject.name;
    newProject.key = dbProject.key;

    if (dbProject.owner?.displayName) {
      newProject.ownerName = dbProject.owner.displayName;
    }
    return newProject;
  }

  private createProjectPayload(req: ProjectRequest): Prisma.ProjectCreateInput {
    const { name, key, description, ownerId } = req.exportObject();
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

  private createEditPayload(req: ProjectRequest): Prisma.ProjectUpdateInput {
    return {
      name: req.name,
      key: req.key,
    };
  }
}
