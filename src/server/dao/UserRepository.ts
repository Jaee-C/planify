import { Prisma } from "@prisma/client";
import { prisma } from "./prisma";
import { UserData } from "@/lib/types";

export default class UserRepository {
  private readonly _projectKey;
  private readonly _userId: number;
  public constructor(pKey: string, userId: number) {
    this._projectKey = pKey;
    this._userId = userId;
  }
  public async fetchUsersInProject(): Promise<UserData[]> {
    const dbResult: UserPayloadDetailed[] = await prisma.user.findMany({
      where: {
        projects: {
          some: {
            project: {
              key: this._projectKey,
              ownerId: this._userId,
            },
          },
        },
      },
      select: userDetailedSelect,
    });
    return dbResult.map(UserRepository.convertToUserType);
  }

  public static async searchAllUsersWithUsername(
    username: string
  ): Promise<UserData[]> {
    const dbResult: UserPayloadBasic[] | null = await prisma.user.findMany({
      where: {
        username: {
          contains: username,
        },
      },
      select: userBasicSelect,
    });

    if (dbResult === null) {
      return [];
    }

    return dbResult.map(UserRepository.convertToUserType);
  }

  public async addUserToProject(id: number): Promise<void> {
    await prisma.projectMember.create({
      data: {
        project: {
          connect: {
            key_ownerId: {
              key: this._projectKey,
              ownerId: this._userId,
            },
          },
        },
        user: {
          connect: {
            id,
          },
        },
      },
    });
  }

  private static convertToUserType(dbUser: UserPayloadDetailed): UserData {
    return {
      id: String(dbUser.id),
      username: dbUser.username,
      displayName: dbUser.displayName ?? "",
    };
  }
}

const userBasicSelect = {
  id: true,
  displayName: true,
  username: true,
} satisfies Prisma.UserSelect;

type UserPayloadBasic = Prisma.UserGetPayload<{
  select: typeof userBasicSelect;
}>;

const userDetailedSelect = {
  id: true,
  displayName: true,
  username: true,
} satisfies Prisma.UserSelect;

type UserPayloadDetailed = Prisma.UserGetPayload<{
  select: typeof userDetailedSelect;
}>;
