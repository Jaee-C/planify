import userRepo from "@/server/domain/UserRepository";
import { User } from "@/lib/interfaces";
import bcrypt from "bcrypt";

const SALT_ROUNDS: number = 10;

class UserRegister {
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
}

export default new UserRegister();
