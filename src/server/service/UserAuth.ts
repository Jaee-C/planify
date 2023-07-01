import userRepo from "@/server/domain/UserRepository";
import { User } from "lib/types";
import bcrypt from "bcrypt";
import { NewUser } from "@/lib/types/User";

const SALT_ROUNDS: number = 10;

class UserAuth {
  public async checkUsernameExists(username: string): Promise<User | null> {
    return await userRepo.getUserByUsername(username);
  }

  public async saveUser(password: string, user: NewUser): Promise<void> {
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
      return userRepo.getUserByUsername(username);
    } else {
      return null;
    }
  }
}

export default new UserAuth();
