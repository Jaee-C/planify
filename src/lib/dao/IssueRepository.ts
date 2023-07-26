import IssueRequest from "@/lib/service/Issue/IssueRequest";
import { prisma } from "@/lib/dao/prisma";
import { Prisma } from "@prisma/client";
import { Issue } from "@/lib/shared";
import { IIssueDB } from "./interfaces";
import AppError from "@/lib/service/AppError";
import {
  INVALID_DATA_TYPES,
  INVALID_SELECT,
  NOT_FOUND_IN_DB,
} from "@/lib/client-data/errors";

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

    return this.dbToServerIssueList(dbIssues);
  }

  public async fetchOneIssueWithId(id: number): Promise<Issue | null> {
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

    return this.dbToServerIssue(dbIssue);
  }

  public async saveNewIssue(req: IssueRequest): Promise<Issue> {
    if (!(req.title && req.status)) {
      throw new AppError(
        INVALID_DATA_TYPES,
        "Invalid request: missing title or status"
      );
    }

    const issueCount: number = await this.getAndIncrementIssueCount();
    let payload: IssuePayload;

    try {
      payload = await prisma.issue.create({
        data: this.createDBIssuePayload(issueCount, req),
        select: issueSelect,
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        this.handlePrismaErrors(e);
      }
    }

    // @ts-ignore
    return this.dbToServerIssue(payload);
  }

  public async editExistingIssue(req: IssueRequest): Promise<Issue> {
    if (req.id === undefined || req.id < 0) {
      throw new AppError(NOT_FOUND_IN_DB, "Invalid issue id.");
    }

    const pid: number | null = await this.findProjectId();

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
          description: req.getEncodedDescription(),
          statusId: req.status,
          priorityId: req.priority,
          boardOrder: req.order,
        },
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        this.handlePrismaErrors(e);
      }
    }

    // @ts-ignore
    return this.dbToServerIssue(dbPayload);
  }

  public async deleteIssue(id: number): Promise<void> {
    const pid: number | null = await this.findProjectId();

    await prisma.issue.delete({
      where: {
        id_projectId: {
          id,
          projectId: pid,
        },
      },
    });
  }

  private dbToServerIssueList(payload: IssuePayload[]): Issue[] {
    return payload.map((dbIssue: IssuePayload) => {
      return this.dbToServerIssue(dbIssue);
    });
  }

  /**
   * Convert payload from db to internal representation that can be reused
   */
  private dbToServerIssue(payload: IssuePayload | DetailedIssuePayload): Issue {
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

    if (
      "description" in payload &&
      payload.description &&
      payload.description.length > 0
    ) {
      result.description = payload.description.toString("utf-8");
    }
    if (payload.boardOrder) result.order = payload.boardOrder;

    return result;
  }

  /** Create issue payload for db */
  private createDBIssuePayload(
    id: number,
    req: IssueRequest
  ): Prisma.IssueCreateInput {
    const createPayload: any = {
      id,
      title: req.title,
      description: req.getEncodedDescription(),
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
          id: req.status,
        },
      },
      priority: undefined,
    };

    // Dynamically add fields if provided
    if (req && typeof req.priority === "number") {
      createPayload.priority = {
        connect: {
          id: req.priority,
        },
      };
    }

    return Prisma.validator<Prisma.IssueCreateInput>()(createPayload);
  }

  /**
   * Issue count is stored in the project table, so we need to fetch it and
   * increment it by one whenever a new issue is created.
   * I haven't found a way to incorporate this with the `INSERT` query, so
   * this is the best I can do for now.
   * @private
   */
  private async getAndIncrementIssueCount(): Promise<number> {
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

    return countPayload.numIssues;
  }

  private async findProjectId(): Promise<number> {
    const projectPayload: any | null = await prisma.project.findFirst({
      where: {
        ownerId: Number(this._userId),
        key: this._projectKey,
      },
      select: {
        id: true,
      },
    });

    if (projectPayload === null) {
      throw new AppError(NOT_FOUND_IN_DB, "Project not found");
    }

    return projectPayload.id;
  }

  private handlePrismaErrors(e: Prisma.PrismaClientKnownRequestError): void {
    switch (e.code) {
      case "P2003":
        throw new AppError(INVALID_SELECT, e.message);
      case "P2025":
        throw new AppError(NOT_FOUND_IN_DB, "Modified issue not found");
    }
  }
}

/** Prisma Types */
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
