import IssueRequest from "@/server/service/Issue/IssueRequest";
import Issue from "@/interfaces/Issue";
import { prisma } from "@/server/domain/prisma";
import { Prisma } from "@prisma/client";
import { StatusType } from "@/interfaces";

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

const statusSelect = {
  id: true,
  name: true,
} satisfies Prisma.StatusTypeSelect;

type StatusPayload = Prisma.StatusTypeGetPayload<{
  select: typeof statusSelect;
}>;

export interface IIssueDB {
  fetchAllIssues(): Promise<Issue[]>;
  saveIssue(req: IssueRequest): Promise<Issue>;
  editIssue(req: IssueRequest): Promise<void>;
  deleteIssue(id: number): Promise<void>;
}

export default class IssueRepository implements IIssueDB {
  private readonly _projectId: number;

  public constructor(pid: number) {
    this._projectId = pid;
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
      data: this.createIssue(issueCount, req.title, req.status),
      select: issueSelect,
    });

    return this.convertToIssue(payload);
  }

  public async editIssue(req: IssueRequest): Promise<void> {
    if (req.id === undefined || req.id < 0) {
      throw new Error("No valid issue id.");
    }

    // TODO: implement updates for different cases
    const issueId: number = req.id;
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

  public async fetchStatuses(): Promise<StatusType[]> {
    const payload: StatusPayload[] = await prisma.statusType.findMany({
      select: statusSelect,
    });

    return payload.map((status: StatusPayload) => {
      return {
        id: status.id,
        name: status.name,
      };
    });
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

  /**
   * Create issue payload for db
   * @param {number} id     issue id, provided by db
   * @param {string} title  issue title
   * @param {number} status id of status
   * @private
   */
  private createIssue(
    id: number,
    title: string,
    status: number
  ): Prisma.IssueCreateInput {
    return Prisma.validator<Prisma.IssueCreateInput>()({
      id,
      title,
      status: {
        connect: {
          id: status,
        },
      },
      project: {
        connect: {
          id: this._projectId,
        },
      },
    });
  }
}
