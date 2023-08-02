import { UserData } from "@/lib/types";
import UserRepository from "@/server/dao/UserRepository";

export default class UsersService {
  private readonly _userDb: UserRepository;

  public constructor(projectKey: string, userId: number) {
    this._userDb = new UserRepository(projectKey, userId);
  }

  public async fetchAllProjectUsers(): Promise<UserData[]> {
    return this._userDb.fetchUsersInProject();
  }

  public static async searchUsersByUsername(
    username: string
  ): Promise<UserData[]> {
    return UserRepository.searchAllUsersWithUsername(username);
  }
}
