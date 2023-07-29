import { Project } from "@/lib/shared";
import { IProjectDB } from "@/server/domain/interfaces";
import ProjectRepository from "@/server/domain/ProjectRepository";
import ProjectRequest from "@/server/service/ProjectRequest";

/**
 * Project is a service class that handles the business logic for a project.
 * It is used by the API route handler to handle requests.
 * @class
 */
export default class ProjectService {
  private readonly _key: string;
  private readonly _projectStore: IProjectDB;

  public constructor(key: string, userId: string) {
    this._key = key;
    this._projectStore = new ProjectRepository(userId);
  }

  public async getProjectDetails(): Promise<Project> {
    return this._projectStore.getDetails(this._key);
  }

  public async updateProjectDetails(
    req: ProjectRequest,
    key: string
  ): Promise<Project> {
    return this._projectStore.editProject(req, key);
  }
}
