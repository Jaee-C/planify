import { Prisma } from "@prisma/client";
import { prisma } from "@/server/domain/prisma";
import { NewUser, User } from "@/lib/types/User";

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

class UserRepository {
  public async getUsernameCount(username: string): Promise<number> {
    return prisma.user.count({
      where: {
        username: username,
      },
    });
  }

  public async getUserByUsername(username: string): Promise<User | null> {
    // @ts-ignore
    const dbResult: UserPayload = await prisma.user.findUnique({
      where: {
        username: username,
      },
      select: userSelect,
    });

    if (dbResult === null) {
      return null;
    }

    return this.convertToUser(dbResult);
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
    await prisma.user.create({
      data: { password, ...user },
    });
  }

  private convertToUser(dbUser: UserPayload): User {
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
