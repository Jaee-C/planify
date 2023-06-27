import IssueRequest from "@/server/service/Issue/IssueRequest";
import Issue from "@/server/service/Issue";
import { prisma } from "@/server/dao/db";
import { Prisma } from "@prisma/client";

// TODO: use Adapter pattern for DAOs
// TODO: promises might be better to be resolved in this layer, instead of
//       passing them to the service layer

const issueSelect = {
  id: true,
  title: true,
  statusId: true,
  project: {
    select: {
      key: true,
    },
  },
} satisfies Prisma.IssueSelect;

type IssuePayload = Prisma.IssueGetPayload<{ select: typeof issueSelect }>;

const issueNumberSelect = {
  numIssues: true,
} satisfies Prisma.ProjectSelect;

type IssueNumberPayload = Prisma.ProjectGetPayload<{
  select: typeof issueNumberSelect;
}>;

export default class IssueDAO {
  private _store: Issue[];
  private _issueId: number = 0;
  private readonly _projectId: number;

  public constructor(pid: number) {
    this._projectId = pid;
    this._store = [];
    this.setUpSample();
  }

  public async fetchAllIssues(): Promise<Issue[]> {
    const dbIssues: IssuePayload[] = await prisma.issue.findMany({
      where: { projectId: this._projectId },
      select: issueSelect,
    });

    return dbIssues.map((dbIssue: IssuePayload) => {
      const issue: Issue = new Issue(dbIssue.id);
      issue.title = dbIssue.title;
      issue.assignee = "testuser";
      issue.status = dbIssue.statusId;
      return issue;
    });
  }

  public async saveIssue(req: IssueRequest): Promise<void> {
    if (!(req.title && req.assignee && req.status)) {
      throw Error("Invalid request");
    }
    this._issueId += 1;
    const newIssue: Issue = new Issue(this._issueId);
    newIssue.title = req.title;
    newIssue.assignee = req.assignee;
    newIssue.status = req.status;
    this._store.push(newIssue);
    await this.createIssue(req.title, req.assignee, req.status);
  }

  public editIssue(req: IssueRequest): void {
    if (req.id === undefined || req.id < 0) {
      throw new Error("No valid issue id.");
    }

    const issueId: number = req.id;
    const foundIssue: Issue | undefined = this._store.find(
      (issue: Issue): boolean => issue.id === issueId
    );

    if (foundIssue === undefined) {
      throw new Error("Index not found");
    }

    if (req.title && req.assignee && req.status) {
      foundIssue.title = req.title;
      foundIssue.assignee = req.assignee;
      foundIssue.status = req.status;
    }
  }

  public deleteIssue(id: number): void {
    const index: number = this._store.findIndex(
      (issue: Issue): boolean => issue.id === id
    );
    this._store.splice(index, 1);
  }

  public setUpSample(): void {
    this._store = [
      this.createData(1, "Create PoC", "Daniel", 3),
      this.createData(2, "Raise Issues", "Daniel", 1),
      this.createData(3, "Update Progress on Issues", "Daniel", 2),
      this.createData(4, "Record all issues", "Daniel", 1),
      this.createData(5, "Manage Issues", "Daniel", 1),
      this.createData(6, "Notify users", "Daniel", 1),
    ];
    this._issueId = 6;
  }

  private createData(
    id: number,
    title: string,
    assignee: string,
    status: number
  ): Issue {
    return { id, title, assignee, status };
  }

  // TODO: return created issue to verify with client
  // Note: custom `Issue` type might not be needed (incompatible with IssuePayload)
  private async createIssue(
    title: string,
    assignee: string,
    status: number
  ): Promise<IssuePayload> {
    const countPayload: IssueNumberPayload | null = await prisma.project.update(
      {
        where: {
          id: this._projectId,
        },
        data: {
          numIssues: {
            increment: 1,
          },
        },
        select: issueNumberSelect,
      }
    );

    if (countPayload === null) {
      throw Error("Project not found");
    }

    const issueCount: number = countPayload.numIssues;

    return prisma.issue.create({
      data: {
        id: issueCount,
        title,
        statusId: status,
        projectId: this._projectId,
      },
      select: issueSelect,
    });
  }
}
