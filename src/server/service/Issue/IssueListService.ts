import { IIssueDB, IProjectDB } from "@/server/dao/interfaces";
import StatusService from "@/server/service/StatusService";
import IssueRepository from "@/server/dao/IssueRepository";
import ProjectRepository from "@/server/dao/ProjectRepository";
import IssueRequest from "@/server/service/Issue/IssueRequest";
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
