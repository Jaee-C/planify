import IssueRepository from "@/server/domain/IssueRepository";
import IssueRequest from "@/server/service/Issue/IssueRequest";
import Issue from "@/interfaces/Issue";

export default class Project {
  private _id: number;
  private _key: string = "";
  private _store: IssueRepository;

  public constructor(id: number) {
    this._id = id;
    this._store = new IssueRepository(id);
    this.setupProjectKey();
  }

  public async saveIssue(issue: IssueRequest): Promise<void> {
    if (!issue.verifyEntries()) {
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

  public async deleteIssue(id: number): Promise<void> {
    this._store.deleteIssue(id);
  }

  private setupProjectKey(): void {
    this._key = "PRJ";
  }
}
