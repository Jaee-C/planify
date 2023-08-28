import { Prisma } from "@prisma/client";
import { prisma } from "@/server/dao/prisma";

export default {
  createProject,
  getAllProjects,
  addUserToProject,
  getProjectDetails,
  updateProject,
};

export interface NewProject {
  name: string;
  description?: string;
  key: string;
  owner: number;
  organisation: string;
}

export interface UpdateProject {
  name?: string;
  description?: string;
  key?: string;
  owner?: number;
}

export interface ProjectTarget {
  organisation: string;
  project?: string;
}

async function createProject(projectDetails: NewProject) {
  return prisma.project.create({
    data: {
      name: projectDetails.name,
      ownerId: projectDetails.owner,
      organisationKey: projectDetails.organisation,
      key: projectDetails.key,
      description: projectDetails.description,
    },
    select: projectSelect,
  });
}

async function updateProject(target: ProjectTarget, data: UpdateProject) {
  if (!target.project) {
    throw new Error("Project not specified");
  }

  try {
    return prisma.project.update({
      where: {
        key_organisationKey: {
          key: target.project,
          organisationKey: target.organisation,
        },
      },
      data: {
        name: data.name,
        description: data.description,
        ownerId: data.owner,
        key: data.key,
      },
      select: projectSelect,
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        throw new Error("Project Key is not unique");
      }
    }
  }
}

async function getAllProjects(org: string) {
  return prisma.project.findMany({
    where: {
      organisation: {
        key: org,
      },
    },
    select: projectSelect,
  });
}

async function addUserToProject(target: ProjectTarget, user: string) {
  if (!target.project) {
    throw new Error("No Project Defined");
  }

  if (!(await userInProjectOrg(target, user))) {
    throw new Error("User not in Organisation");
  }

  await prisma.projectMember.create({
    data: {
      project: {
        connect: {
          key_organisationKey: {
            key: target.project,
            organisationKey: target.organisation,
          },
        },
      },
      user: {
        connect: {
          email: user,
        },
      },
    },
  });
}

async function getProjectDetails(target: ProjectTarget) {
  const payload = prisma.project.findFirst({
    where: {
      key: target.project,
      organisationKey: target.organisation,
    },
    select: projectSelect,
  });

  if (payload === null) {
    throw new Error("Project not found");
  }

  return payload;
}

async function userInProjectOrg(target: ProjectTarget, user: string) {
  if (!target.project) {
    throw new Error("No Project Defined");
  }

  const found = await prisma.projectMember.findFirst({
    where: {
      project: {
        key: target.project,
        organisation: {
          users: {
            some: {
              user: {
                email: user,
              },
            },
          },
        },
      },
    },
  });

  return found !== null;
}

const projectSelect = {
  id: true,
  name: true,
  key: true,
  owner: {
    select: {
      displayName: true,
    },
  },
} satisfies Prisma.ProjectSelect;

type ProjectPayload = Prisma.ProjectGetPayload<{
  select: typeof projectSelect;
}>;
