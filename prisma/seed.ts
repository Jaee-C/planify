import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main(): Promise<void> {
  // StatusType
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

  // PriorityType
  await prisma.priorityType.create({
    data: {
      name: "Low",
    },
  });

  await prisma.priorityType.create({
    data: {
      name: "Medium",
    },
  });

  await prisma.priorityType.create({
    data: {
      name: "High",
    },
  });

  await prisma.priorityType.create({
    data: {
      name: "Critical",
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

  // Default project
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
