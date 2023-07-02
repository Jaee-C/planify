import IssueRepository from "@/server/domain/IssueRepository";
import IssueRequest from "@/server/service/Issue/IssueRequest";
import { Issue, StatusType, PriorityType } from "lib/types";

export default class Project {
  private readonly _id: string;
  private readonly _store: IssueRepository;

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
