import IssueRepository from "@/server/domain/IssueRepository";
import IssueRequest from "@/server/service/Issue/IssueRequest";
import { Issue, StatusType, PriorityType } from "lib/types";

/**
 * Project is a service class that handles the business logic for the project.
 * It is used by the API route handler to handle requests.
 * @class
 */
export default class Project {
  /**
   * @property {string} _id - The project key.
   * @private
   */
  private readonly _id: string;
  /**
   * @property {IssueRepository} _store - The database repository.
   * @private
   */
  private readonly _store: IssueRepository;

  /**
   * Creates a new Project instance.
   * @param {string} key - The project key.
   * @param {string} user - The user identifier, (usually) obtained from the
   * JWT.
   */
  public constructor(key: string, user: string) {
    this._id = key;
    this._store = new IssueRepository(key, user);
  }

  public async saveIssue(issue: IssueRequest): Promise<void> {
    if (!(await issue.verifyEntries(this._store))) {
      throw new Error("Invalid request");
    }

    if (issue.id != undefined) {
      await this._store.editIssue(issue);
      return;
    }
    await this._store.saveIssue(issue);
  }

  public async getAllIssues(): Promise<Issue[]> {
    return this._store.fetchAllIssues();
  }

  public async getAllStatuses(): Promise<StatusType[]> {
    return this._store.fetchStatuses();
  }

  public async getAllPriorities(): Promise<PriorityType[]> {
    return this._store.fetchPriorities();
  }

  public async deleteIssue(id: number): Promise<void> {
    // Filter out impossible IDs
    if (Number.isNaN(id) || id < 1) return;
    await this._store.deleteIssue(id);
  }
}
