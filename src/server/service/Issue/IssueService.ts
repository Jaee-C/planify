import { Issue } from "@/lib/shared";
import { IIssueDB } from "@/server/domain/interfaces";
import IssueRepository from "@/server/domain/IssueRepository";
import IssueRequest from "@/server/service/Issue/IssueRequest";

export default class IssueService {
  private readonly _issueStore: IIssueDB;

  public constructor(pKey: string, userId: string) {
    this._issueStore = new IssueRepository(pKey, userId);
  }

  public async getIssue(key: string): Promise<Issue> {
    const issueId: number = this.getIssueId(key);

    const foundIssue: Issue | null = await this._issueStore.fetchOneIssueWithId(
      issueId
    );

    if (foundIssue === null) {
      throw new Error("Issue not found");
    }
    return foundIssue;
  }

  public async editIssue(issue: IssueRequest): Promise<Issue> {
    return this._issueStore.editExistingIssue(issue);
  }

  public async deleteIssue(key: string): Promise<void> {
    const issueId: number = this.getIssueId(key);
    await this._issueStore.deleteIssue(issueId);
  }

  private getIssueId(key: string): number {
    const splitKey: string[] = key.split("-");
    const issueId: number = Number(splitKey[1]);

    if (Number.isNaN(issueId)) {
      throw new Error("Invalid issue key");
    }
    return issueId;
  }
}
