import "server-only";

import { Prisma } from "@prisma/client";
import { prisma } from "@/server/domain/prisma";
import { NewUser, UserData, SessionUser } from "@/lib/types";
import { IUserDB } from "@/server/domain/interfaces";
import { USER_CREATION_ERROR } from "@/lib/client-data/errors";
import AppError from "@/server/service/AppError";

const userSelect = {
  id: true,
  firstName: true,
  lastName: true,
  displayName: true,
  username: true,
} satisfies Prisma.UserSelect;

type UserPayload = Prisma.UserGetPayload<{
  select: typeof userSelect;
}>;

class UserRepository implements IUserDB {
  public constructor() {}
  public async getUsernameCount(username: string): Promise<number> {
    return prisma.user.count({
      where: {
        username: username,
      },
    });
  }

  public async getUsername(id: string): Promise<string | undefined> {
    const dbResult = await prisma.user.findFirst({
      select: {
        username: true,
      },
      where: {
        id: Number(id),
      },
    });

    return dbResult?.username;
  }

  public async searchAllUsersWithUsername(
    username: string
  ): Promise<UserData[]> {
    const dbResult: UserPayload[] = await prisma.user.findMany({
      where: {
        username: {
          contains: username,
        },
      },
      select: userSelect,
    });

    return dbResult.map(this.convertToSessionUser);
  }

  public async getAllUsersInProject(
    projectKey: string,
    userId: number
  ): Promise<UserData[]> {
    const dbResult: UserPayload[] = await prisma.user.findMany({
      where: {
        projects: {
          some: {
            project: {
              key: projectKey,
            },
            userId: userId,
          },
        },
      },
      select: userSelect,
    });

    return dbResult.map(this.convertToSessionUser);
  }

  public async getUserByUsername(username: string): Promise<UserData | null> {
    const dbResult: UserPayload | null = await prisma.user.findUnique({
      where: {
        username: username,
      },
      select: userSelect,
    });

    if (dbResult === null) {
      return null;
    }

    return this.convertToSessionUser(dbResult);
  }

  public async getUserPassword(username: string): Promise<string | undefined> {
    const dbResult = await prisma.user.findFirst({
      where: {
        username: username,
      },
      select: {
        password: true,
      },
    });

    return dbResult?.password;
  }

  public async saveUser(password: string, user: NewUser): Promise<void> {
    try {
      await prisma.user.create({
        data: { password, ...user },
      });
    } catch (e) {
      if (e instanceof Error) {
        throw new AppError(USER_CREATION_ERROR, e.message);
      }
    }
  }

  private convertToSessionUser(dbUser: UserPayload): SessionUser {
    let displayName: string;
    if (dbUser.displayName) {
      displayName = dbUser.displayName;
    } else if (dbUser.firstName && dbUser.lastName) {
      displayName = `${dbUser.firstName} ${dbUser.lastName}`;
    } else {
      displayName = dbUser.username;
    }

    return {
      id: dbUser.id.toString(),
      firstName: dbUser.firstName,
      lastName: dbUser.lastName,
      displayName,
    };
  }
}

const userRepo: UserRepository = new UserRepository();

export default userRepo;
