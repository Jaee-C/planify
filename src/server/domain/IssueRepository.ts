import IssueRequest from "@/lib/service/Issue/IssueRequest";
import { prisma } from "@/server/domain/prisma";
import { Prisma } from "@prisma/client";
import { Issue } from "lib/types";
import { IIssueDB } from "./interfaces";
import AppError from "@/lib/service/AppError";
import {
  INVALID_DATA_TYPES,
  INVALID_SELECT,
  NOT_FOUND_IN_DB,
} from "@/lib/client-data/errors";

const issueSelect = {
  id: true,
  title: true,
  boardOrder: true,
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

const detailedIssue = {
  ...issueSelect,
  description: true,
};

type DetailedIssuePayload = Prisma.IssueGetPayload<{
  select: typeof detailedIssue;
}>;

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
    const dbIssue: DetailedIssuePayload | null = await prisma.issue.findFirst({
      where: {
        project: {
          ownerId: Number(this._userId),
          key: this._projectKey,
        },
        id: id,
      },
      select: detailedIssue,
    });

    if (!dbIssue) {
      return null;
    }

    return this.convertToIssue(dbIssue);
  }

  public async saveIssue(req: IssueRequest): Promise<Issue> {
    if (!(req.title && req.status)) {
      throw new AppError(
        INVALID_DATA_TYPES,
        "Invalid request: missing title or status"
      );
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
      throw new AppError(NOT_FOUND_IN_DB, "Project not found");
    }

    const issueCount: number = countPayload.numIssues;
    let payload: IssuePayload;

    try {
      payload = await prisma.issue.create({
        data: this.createDBIssue(issueCount, req.title, req.status, req),
        select: issueSelect,
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === "P2003") {
          throw new AppError(INVALID_SELECT, e.message);
        }
      }
    }

    // @ts-ignore
    return this.convertToIssue(payload);
  }

  public async editIssue(req: IssueRequest): Promise<Issue> {
    if (req.id === undefined || req.id < 0) {
      throw new AppError(NOT_FOUND_IN_DB, "Invalid issue id.");
    }

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
      throw new AppError(NOT_FOUND_IN_DB, "Project not found");
    }

    let dbPayload: IssuePayload;
    try {
      dbPayload = await prisma.issue.update({
        where: {
          id_projectId: {
            id: req.id,
            projectId: pid,
          },
        },
        select: issueSelect,
        data: {
          title: req.title,
          description: req.description,
          statusId: req.status,
          priorityId: req.priority,
          boardOrder: req.order,
        },
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === "P2003") {
          throw new AppError(
            INVALID_SELECT,
            "Selected invalid option from dropdown"
          );
        }
        if (e.code === "P2025") {
          throw new AppError(NOT_FOUND_IN_DB, "Modified issue not found");
        }
      }
    }

    // @ts-ignore
    return this.convertToIssue(dbPayload);
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
   * @param {IssuePayload | DetailedIssuePayload} payload payload from db
   * @returns {Issue}
   * @private
   */
  private convertToIssue(payload: IssuePayload | DetailedIssuePayload): Issue {
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

    if ("description" in payload && payload.description) {
      result.description = payload.description;
    }
    if (payload.boardOrder) result.order = payload.boardOrder;

    return result;
  }

  /**
   * Create issue payload for db
   * @param {number} id     issue id, provided by db
   * @param {string} title  issue title
   * @param {number} status id of status
   * @param {IssueRequest} [req] remaining (optional) request values
   * @private
   */
  private createDBIssue(
    id: number,
    title: string,
    status?: number,
    req?: IssueRequest
  ): Prisma.IssueCreateInput {
    const createPayload = {
      id,
      title,
      project: {
        connect: {
          key_ownerId: {
            key: this._projectKey,
            ownerId: Number(this._userId),
          },
        },
      },
      status: {
        connect: {
          id: status,
        },
      },
      priority: undefined,
    };

    // Dynamically add fields if provided
    if (req && typeof req.priority === "number") {
      // @ts-ignore
      createPayload.priority = {
        connect: {
          id: req.priority,
        },
      };
    }

    if (req && typeof req.description === "string") {
      // @ts-ignore
      createPayload.description = req.description;
    }
    return Prisma.validator<Prisma.IssueCreateInput>()(createPayload);
  }
}
