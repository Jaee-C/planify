import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main(): Promise<void> {
  await prisma.statusType.create({
    data: {
      id: 1,
      name: "To Do",
    },
  });
  await prisma.statusType.create({
    data: {
      id: 2,
      name: "In Progress",
    },
  });
  await prisma.statusType.create({
    data: {
      id: 3,
      name: "Done",
    },
  });

  await prisma.user.create({
    data: {
      id: 1,
      username: "guestuser",
      displayName: "Guest",
      password: "nopassword",
    },
  });

  await prisma.project.create({
    data: {
      id: 1,
      name: "Project 1",
      key: "PRJ",
      ownerId: 1,
      numIssues: 1,
    },
  });

  await prisma.issue.create({
    data: {
      id: 1,
      title: "Issue 1",
      description: "Issue 1 description",
      statusId: 1,
      projectId: 1,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
