import userRepo from "@/server/domain/UserRepository";
import { User } from "@/lib/interfaces";
import bcrypt from "bcrypt";

const SALT_ROUNDS: number = 10;

class UserAuth {
  public async checkUsernameExists(username: string): Promise<boolean> {
    const userCount: number = await userRepo.getUsernameCount(username);

    return userCount > 0;
  }

  public async saveUser(password: string, user: User): Promise<void> {
    bcrypt.hash(
      password,
      SALT_ROUNDS,
      async (err: Error | undefined, hash: string): Promise<void> => {
        if (err) throw err;

        await userRepo.saveUser(hash, user);
      }
    );
  }

  public async verifyUser(
    username: string,
    password: string
  ): Promise<User | null> {
    const hash: string | undefined = await userRepo.getUserPassword(username);

    if (!hash) {
      return null;
    }

    const match: boolean = await bcrypt.compare(password, hash);

    if (match) {
      return userRepo.getUser(username);
    } else {
      return null;
    }
  }
}

export default new UserAuth();
