import { prisma } from "@/server/dao/prisma";
import { Prisma } from "@prisma/client";
import AppError from "@/server/service/AppError";
import { NOT_FOUND_IN_DB } from "@/lib/client-data/errors";
import { IssueDetailedData } from "@/lib/types/data/IssueData";

export default {
  fetchAllIssues,
  fetchOneIssue,
  createIssue,
  editIssue,
  deleteIssue,
};

/** Helper function is defined in utils to convert API request to this format*/
export interface IssueTarget {
  organisation: string;
  project: string;
  issueKey?: string;
}

export interface NewIssuePayload {
  title: string;
}

export interface EditIssuePayload {
  title: string;
  description?: Buffer;
  status?: number;
  priority?: number;
  order?: string;
}

export async function fetchAllIssues(target: IssueTarget) {
  const dbIssues: IssuePayload[] = await prisma.issue.findMany({
    where: {
      project: {
        key: target.project,
        organisationKey: target.organisation,
      },
    },
    select: issueSelect,
  });

  return toServerIssueList(dbIssues);
}

export async function fetchOneIssue(
  target: IssueTarget
): Promise<IssueDetailedData | null> {
  if (target.issueKey === undefined) {
    return null;
  }

  const issueId = getIssueId(target.issueKey);

  const dbIssue = await prisma.issue.findFirst({
    where: {
      project: {
        key: target.project,
        organisationKey: target.organisation,
      },
      id: issueId,
    },
    select: detailedIssue,
  });

  if (!dbIssue) {
    return null;
  }

  return toServerIssue(dbIssue);
}

export async function createIssue(target: IssueTarget, data: NewIssuePayload) {
  const issueCount: number = await getAndIncrementIssueCount(target);

  try {
    const res = await prisma.issue.create({
      data: {
        id: issueCount,
        title: data.title,
        status: {
          connect: {
            id: 1,
          },
        },
        project: {
          connect: {
            key_organisationKey: {
              key: target.project,
              organisationKey: target.organisation,
            },
          },
        },
      },
      select: issueSelect,
    });

    return toServerIssue(res);
  } catch (e) {
    return null;
  }
}

export async function editIssue(
  target: IssueTarget,
  data: EditIssuePayload
): Promise<IssueDetailedData | null> {
  if (!target.issueKey) {
    return null;
  }

  const projectId = await getProjectId(target);

  if (Number.isNaN(projectId)) {
    return null;
  }

  const id = getIssueId(target.issueKey);
  try {
    const res = await prisma.issue.update({
      where: {
        id_projectId: {
          id,
          projectId,
        },
      },
      data: {
        ...data,
        status: {
          connect: {
            id: data.status,
          },
        },
        priority: {
          connect: {
            id: data.priority,
          },
        },
      },
      select: detailedIssue,
    });
    return toServerIssue(res);
  } catch (e) {
    return null;
  }
}

export async function deleteIssue(target: IssueTarget): Promise<boolean> {
  if (target.issueKey === undefined) {
    return false;
  }
  const id: number = getIssueId(target.issueKey);

  if (Number.isNaN(id)) {
    return false;
  }

  try {
    const projectId = await getProjectId(target);

    if (Number.isNaN(projectId)) {
      return false;
    }

    await prisma.issue.delete({
      where: {
        id_projectId: {
          id,
          projectId: projectId,
        },
      },
    });
  } catch (e) {
    return false;
  }

  return true;
}

function toServerIssueList(payload: IssuePayload[]): IssueDetailedData[] {
  return payload.map((dbIssue: IssuePayload) => {
    return toServerIssue(dbIssue);
  });
}

function toServerIssue(
  dbIssue: IssuePayload | DetailedIssuePayload
): IssueDetailedData {
  return {
    id: dbIssue.id,
    title: dbIssue.title,
    issueKey: getIssueKey(dbIssue.project.key, dbIssue.id),
    description: "",
    status: undefined,
    priority: undefined,
    order: dbIssue.boardOrder ?? undefined,
  };
}

function getIssueKey(project: string, id: number): string {
  return `${project}-${id}`;
}

function getIssueId(key: string): number {
  const separated = key.split("-");
  return Number(separated[1]);
}

async function getProjectId(target: IssueTarget): Promise<number> {
  const project = await prisma.project.findFirst({
    where: {
      key: target.project,
      organisationKey: target.organisation,
    },
    select: {
      id: true,
    },
  });

  if (project === null) {
    return Number.NaN;
  }

  return project.id;
}

async function getAndIncrementIssueCount(target: IssueTarget): Promise<number> {
  const countPayload: IssueNumberPayload | null = await prisma.project.update({
    where: {
      key_organisationKey: {
        key: target.project,
        organisationKey: target.organisation,
      },
    },
    data: {
      numIssues: {
        increment: 1,
      },
    },
    select: issueNumberSelect,
  });

  if (countPayload === null) {
    throw new AppError(NOT_FOUND_IN_DB, "Project not found");
  }

  return countPayload.numIssues;
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
