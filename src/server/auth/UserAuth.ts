import userRepo from "@/server/dao/AuthRepository";
import { UserData } from "@/lib/types";
import bcrypt from "bcrypt";
import { NewUser } from "@/lib/types";
import AppError from "@/server/service/AppError";

const SALT_ROUNDS: number = 10;

class UserAuth {
  public async checkUsernameExists(username: string): Promise<UserData | null> {
    return await userRepo.getUserByUsername(username);
  }

  public async saveUser(password: string, user: NewUser): Promise<void> {
    bcrypt.hash(
      password,
      SALT_ROUNDS,
      async (err: Error | undefined, hash: string): Promise<void> => {
        if (err) {
          throw new AppError(50001, "Error hashing password");
        }

        await userRepo.saveUser(hash, user);
      }
    );
  }

  public async verifyUser(
    username: string,
    password: string
  ): Promise<UserData | null> {
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
