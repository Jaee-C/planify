import { prisma } from "./prisma";

export default {
  fetchUserIfExists,
  createUser,
  updatePassword,
};

async function fetchUserIfExists(email: string) {
  return prisma.user.findFirst({
    where: {
      email,
    },
  });
}

async function createUser(email: string, password: string): Promise<void> {
  await prisma.user.create({
    data: {
      email,
      password,
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
