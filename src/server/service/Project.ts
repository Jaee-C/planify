import IssueDAO from "@/server/dao/IssueDAO";
import IssueRequest from "@/server/service/Issue/IssueRequest";
import { UIIssue } from "@/interfaces";
import Issue from "@/server/service/Issue";

export default class Project {
  private _id: number;
  private _key: string = "";
  private _store: IssueDAO;

  public constructor(id: number) {
    this._id = id;
    this._store = new IssueDAO(id);
    this.setupProjectKey();
  }

  public saveIssue(issue: IssueRequest): void {
    if (!issue.verifyEntries()) {
      throw new Error("Invalid request");
    }

    if (issue.id != undefined) {
      this._store.editIssue(issue);
      return;
    }
    this._store.saveIssue(issue);
  }

  public getAllIssues(): UIIssue[] {
    const dbIssue: Issue[] = this._store.fetchAllIssues();
    const result: UIIssue[] = [];

    dbIssue.forEach((issue: UIIssue): void => {
      result.push({
        ...issue,
        key: this._key + "-" + issue.id,
      });
    });

    return result;
  }

  public deleteIssue(id: number): void {
    this._store.deleteIssue(id);
  }

  private setupProjectKey(): void {
    this._key = "PRJ";
  }
}
