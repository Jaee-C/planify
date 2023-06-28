import IssueRequest from "@/server/service/Issue/IssueRequest";
import Issue from "@/server/service/Issue";
import { prisma } from "@/server/domain/prisma";
import { Prisma } from "@prisma/client";

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

export interface IIssueDB {
  fetchAllIssues(): Promise<Issue[]>;
  saveIssue(req: IssueRequest): Promise<Issue>;
  editIssue(req: IssueRequest): Promise<void>;
  deleteIssue(id: number): Promise<void>;
}

export default class IssueRepository implements IIssueDB {
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
      return this.convertToIssue(dbIssue);
    });
  }

  public async saveIssue(req: IssueRequest): Promise<Issue> {
    if (!(req.title && req.assignee && req.status)) {
      throw Error("Invalid request");
    }

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

    const payload: IssuePayload = await prisma.issue.create({
      data: {
        id: issueCount,
        title: req.title,
        statusId: req.status,
        projectId: this._projectId,
      },
      select: issueSelect,
    });

    return this.convertToIssue(payload);
  }

  public async editIssue(req: IssueRequest): Promise<void> {
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

  public async deleteIssue(id: number): Promise<void> {
    await prisma.issue.delete({
      where: {
        id_projectId: {
          id,
          projectId: this._projectId,
        },
      },
    });
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
    return { id, title, assignee, status, issueKey: `IT-${id}` };
  }

  /**
   * Convert payload from db so internal representation that can be reused
   * @param {IssuePayload} payload payload from db
   * @returns {Issue}
   * @private
   */
  private convertToIssue(payload: IssuePayload): Issue {
    const result: Issue = new Issue(payload.id);

    result.title = payload.title;
    result.status = payload.statusId;
    result.issueKey = `${payload.project.key}-${payload.id}`;
    result.assignee = "testuser";

    return result;
  }
}
