import { prisma } from "@/server/dao/prisma";
import { Prisma } from "@prisma/client";
import UserRepository from "@/server/dao/UserRepository";

export default {
  findUsers,
  addUserToOrganisation,
  createOrganisation,
  removeUser,
  getDefaultOrganisation,
  getAllOrganisations,
};

export interface NewOrganisation {
  name: string;
  description?: string;
  key: string;
}

async function findUsers(query: string, org: string) {
  if (query === "") {
    return prisma.user.findMany({
      where: {
        organisations: {
          some: {
            organisation: {
              key: org,
            },
          },
        },
      },
    });
  }

  return prisma.user.findMany({
    where: {
      organisations: {
        some: {
          organisation: {
            key: org,
          },
        },
      },

      OR: [
        {
          displayName: {
            contains: query,
          },
        },
        {
          email: {
            contains: query,
          },
        },
      ],
    },
  });
}

async function getDefaultOrganisation(id: string) {
  return prisma.organisation.findFirst({
    where: {
      users: {
        some: {
          userId: id,
        },
      },
    },
  });
}

async function getAllOrganisations(id: string): Promise<OrganisationPayload[]> {
  return prisma.organisation.findMany({
    where: {
      users: {
        some: {
          userId: id,
        },
      },
    },
    select: organisationSimpleSelect,
  });
}

async function addUserToOrganisation(email: string, org: string) {
  try {
    const user = await UserRepository.fetchUserIfExists(email);

    if (!user) {
      console.log(`User ${email} not found`);
      return;
    }

    await prisma.organisationUser.create({
      data: {
        userId: user.id,
        organisationKey: org,
        role: "member",
      },
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code == "P2025") {
        console.log(`User ${email} not found`);
      } else if (e.code === "P2018") {
        console.log("OrganisationSettings not found");
      }
      throw e;
    }
    throw e;
  }
}

async function createOrganisation(email: string, orgDetails: NewOrganisation) {
  // Create new organisation
  const newOrg = await prisma.organisation.create({
    data: {
      name: orgDetails.name,
      description: orgDetails.description,
      key: orgDetails.key,
    },
  });

  // Set `email` as owner
  await setOwner(email, newOrg.key);
}

async function removeUser(email: string, org: string): Promise<void> {
  const user = await UserRepository.fetchUserIfExists(email);

  if (!user) {
    throw new Error("User not found");
  }

  await prisma.organisationUser.delete({
    where: {
      organisationKey_userId: {
        organisationKey: org,
        userId: user.id,
      },
    },
  });
}

async function setOwner(email: string, org: string): Promise<void> {
  const user = await UserRepository.fetchUserIfExists(email);

  if (!user) {
    throw new Error("User not found");
  }
  await prisma.organisationUser.upsert({
    where: {
      organisationKey_userId: {
        userId: user.id,
        organisationKey: org,
      },
    },
    update: {
      role: "owner",
    },
    create: {
      userId: user.id,
      organisationKey: org,
      role: "owner",
    },
  });
}

const organisationSimpleSelect = {
  id: true,
  name: true,
  key: true,
} satisfies Prisma.OrganisationSelect;

export type OrganisationPayload = Prisma.OrganisationGetPayload<{
  select: typeof organisationSimpleSelect;
}>;
