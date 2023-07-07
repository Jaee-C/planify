import IssueRequest from "@/server/service/Issue/IssueRequest";
import { prisma } from "@/server/domain/prisma";
import { Prisma } from "@prisma/client";
import { Issue, StatusType } from "lib/types";
import { IIssueDB } from "./interfaces";

const issueSelect = {
  id: true,
  title: true,
  status: {
    select: {
      id: true,
      name: true,
    },
  },
  priority: {
    select: {
      id: true,
      name: true,
    },
  },
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

export default class IssueRepository implements IIssueDB {
  private readonly _projectKey: string;
  private readonly _userId: string;

  public constructor(pKey: string, user: string) {
    this._projectKey = pKey;
    this._userId = user;
  }

  public async fetchAllIssues(): Promise<Issue[]> {
    const dbIssues: IssuePayload[] = await prisma.issue.findMany({
      where: {
        project: {
          ownerId: Number(this._userId),
          key: this._projectKey,
        },
      },
      select: issueSelect,
    });

    return dbIssues.map((dbIssue: IssuePayload) => {
      return this.convertToIssue(dbIssue);
    });
  }

  public async fetchIssue(id: number): Promise<Issue | null> {
    const dbIssue: IssuePayload | null = await prisma.issue.findFirst({
      where: {
        project: {
          ownerId: Number(this._userId),
          key: this._projectKey,
        },
        id: id,
      },
      select: issueSelect,
    });

    if (!dbIssue) {
      return null;
    }

    return this.convertToIssue(dbIssue);
  }

  public async saveIssue(req: IssueRequest): Promise<Issue> {
    if (!(req.title && req.assignee && req.status)) {
      throw Error("Invalid request");
    }

    const countPayload: IssueNumberPayload | null = await prisma.project.update(
      {
        where: {
          key_ownerId: {
            ownerId: Number(this._userId),
            key: this._projectKey,
          },
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
    console.log(req);

    const pid: number | null = await prisma.project
      .findFirst({
        where: {
          ownerId: Number(this._userId),
          key: this._projectKey,
        },
        select: {
          id: true,
        },
      })
      ?.then(project => project?.id ?? null);

    if (!pid) {
      throw new Error("Project not found");
    }

    await prisma.issue.update({
      where: {
        id_projectId: {
          id: req.id,
          projectId: pid,
        },
      },
      data: {
        title: req.title,
        description: req.description,
        statusId: req.status,
        priorityId: req.priority,
      },
    });
  }

  public async deleteIssue(id: number): Promise<void> {
    const pid: number | null = await prisma.project
      .findFirst({
        where: {
          ownerId: Number(this._userId),
          key: this._projectKey,
        },
        select: {
          id: true,
        },
      })
      ?.then(project => project?.id ?? null);

    if (!pid) {
      throw new Error("Project not found");
    }

    await prisma.issue.delete({
      where: {
        id_projectId: {
          id,
          projectId: pid,
        },
      },
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
    result.status = { id: payload.status.id, name: payload.status.name };
    result.issueKey = `${payload.project.key}-${payload.id}`;
    if (payload.priority) {
      result.priority = {
        id: payload.priority.id,
        name: payload.priority.name,
      };
    }

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
          key_ownerId: {
            key: this._projectKey,
            ownerId: Number(this._userId),
          },
        },
      },
    });
  }
}
