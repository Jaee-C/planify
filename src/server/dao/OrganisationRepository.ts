import { prisma } from "@/server/dao/prisma";
import { Prisma } from "@prisma/client";
import UserRepository from "@/server/dao/UserRepository";

export default {
  addUserToOrganisation,
  createOrganisation,
  removeUser,
};

export interface NewOrganisation {
  name: string;
  description?: string;
  key: string;
}

async function addUserToOrganisation(email: string, org: string) {
  try {
    const user = await UserRepository.fetchUserIfExists(email);

    if (!user) {
      throw new Error("User not found");
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
        throw new Error("User not found");
      } else if (e.code === "P2018") {
        throw new Error("Organisation not found");
      }
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

async function removeUser(email: string, org: string) {
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

async function setOwner(email: string, org: string) {
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
