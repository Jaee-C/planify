import { prisma } from "./prisma";
import { Prisma } from "@prisma/client";
import { NewUserInput } from "@/server/service/AuthService";

export default {
  fetchUserIfExists,
  createUser,
  updatePassword,
  searchUser,
  getAllUsers,
};

export interface UserTarget {
  organisation: string;
  project?: string;
}

async function fetchUserIfExists(email: string) {
  return prisma.user.findFirst({
    where: {
      email,
    },
  });
}

async function createUser(input: NewUserInput): Promise<void> {
  await prisma.user.create({
    data: {
      email: input.email,
      password: input.password,
      firstName: input.firstName,
      lastName: input.lastName,
    },
  });
}

async function updatePassword(email: string, newP: string): Promise<void> {
  await prisma.user.update({
    data: {
      password: newP,
    },
    where: {
      email,
    },
  });
}

async function searchUser(search: string): Promise<UserBasicPayload[]> {
  return prisma.user.findMany({
    where: {
      OR: [
        {
          displayName: {
            contains: search,
          },
        },
        {
          email: {
            contains: search,
          },
        },
      ],
    },
    select: userBasicSelect,
  });
}

async function getAllUsers(target: UserTarget) {
  return prisma.user.findMany({
    where: {
      organisations: {
        some: {
          organisationKey: target.organisation,
        },
      },
    },
    select: userBasicSelect,
  });
}

const userBasicSelect = {
  id: true,
  email: true,
  displayName: true,
} satisfies Prisma.UserSelect;
type UserBasicPayload = Prisma.UserGetPayload<{
  select: typeof userBasicSelect;
}>;
