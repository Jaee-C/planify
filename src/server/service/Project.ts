import IssueRepository from "@/server/domain/IssueRepository";
import IssueRequest from "@/server/service/Issue/IssueRequest";
import { Issue, StatusType, PriorityType } from "lib/types";
import { IIssueDB } from "@/server/domain/interfaces";

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
   * @property {IIssueDB} _store - The database repository.
   * @private
   */
  private readonly _store: IIssueDB;

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

  public async getIssue(key: string): Promise<Issue> {
    const issueId: number = this.getIssueId(key);

    const foundIssue: Issue | null = await this._store.fetchIssue(issueId);

    if (foundIssue === null) {
      throw new Error("Issue not found");
    }
    return foundIssue;
  }

  public async deleteIssue(key: string): Promise<void> {
    const issueId: number = this.getIssueId(key);
    await this._store.deleteIssue(issueId);
  }
  private getIssueId(key: string): number {
    const splitKey: string[] = key.split("-");

    if (Number.isNaN(Number(splitKey[1]))) {
      throw new Error("Invalid issue key");
    }
    return Number(splitKey[1]);
  }
}
