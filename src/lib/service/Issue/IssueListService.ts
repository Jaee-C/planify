import { IIssueDB, IProjectDB } from "@/lib/dao/interfaces";
import StatusService from "@/lib/service/StatusService";
import IssueRepository from "@/lib/dao/IssueRepository";
import ProjectRepository from "@/lib/dao/ProjectRepository";
import IssueRequest from "@/lib/service/Issue/IssueRequest";
import { Issue } from "@/lib/shared";

export default class IssueListService {
  private readonly _projectKey: string;
  private readonly _issueStore: IIssueDB;
  private readonly _projectStore: IProjectDB;
  private readonly _status: StatusService;

  public constructor(pKey: string, userId: string) {
    this._projectKey = pKey;
    this._issueStore = new IssueRepository(pKey, userId);
    this._status = new StatusService(pKey);
    this._projectStore = new ProjectRepository(userId);
  }

  public async saveIssue(issue: IssueRequest): Promise<Issue> {
    return this._issueStore.saveNewIssue(issue);
  }

  public async getAllIssues(): Promise<Issue[]> {
    return this._issueStore.fetchAllIssues();
  }
}
