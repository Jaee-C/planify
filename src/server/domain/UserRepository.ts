import { prisma } from "@/server/domain/prisma";
import { User } from "@/lib/interfaces/User";

class UserRepository {
  public async getUsernameCount(username: string): Promise<number> {
    return prisma.user.count({
      where: {
        username: username,
      },
    });
  }

  public async getUser(username: string): Promise<User | null> {
    return prisma.user.findFirst({
      where: {
        username: username,
      },
    });
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

  public async saveUser(password: string, user: User): Promise<void> {
    await prisma.user.create({
      data: { password, ...user },
    });
  }
}

const userRepo: UserRepository = new UserRepository();

export default userRepo;
