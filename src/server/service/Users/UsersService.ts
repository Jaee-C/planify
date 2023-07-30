import "server-only";
import { UserData } from "@/lib/types";
import userRepo from "@/server/domain/UserRepository";
import { IUserDB } from "@/server/domain/interfaces";

export default class UsersService {
  private readonly _userDb: IUserDB = userRepo;

  public async fetchAllProjectUsers(
    projectKey: string,
    userId: number
  ): Promise<UserData[]> {
    return userRepo.getAllUsersInProject(projectKey, userId);
  }

  public async searchUsersByUsername(username: string): Promise<UserData[]> {
    return userRepo.searchAllUsersWithUsername(username);
  }
}
