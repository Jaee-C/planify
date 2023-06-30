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

  public async saveUser(password: string, user: User): Promise<void> {
    await prisma.user.create({
      data: { password, ...user },
    });
  }
}

const userRepo: UserRepository = new UserRepository();

export default userRepo;
