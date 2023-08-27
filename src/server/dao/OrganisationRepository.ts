import { prisma } from "@/server/dao/prisma";

export default {
  addUserToOrganisation,
};

async function addUserToOrganisation(email: string, org: string) {
  await prisma.user.update({
    where: {
      email,
    },
    data: {
      organisations: {
        connect: [
          {
            key: org,
          },
        ],
      },
    },
  });
}
