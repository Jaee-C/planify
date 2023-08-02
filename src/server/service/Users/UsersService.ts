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

  public async addUserToProject(id: number): Promise<void> {
    this._userDb.addUserToProject(id);
  }

  public async searchUsersByUsername(username: string): Promise<UserData[]> {
    const allUsers: UserData[] =
      await UserRepository.searchAllUsersWithUsername(username);
    const projectUsers: UserData[] = await this.fetchAllProjectUsers();

    return this.removeProjectUsers(allUsers, projectUsers);
  }

  private removeProjectUsers(
    allUsers: UserData[],
    projectUsers: UserData[]
  ): UserData[] {
    const projectUserId: string[] = projectUsers.map(user => user.id);

    return allUsers.filter(user => !projectUserId.includes(user.id));
  }
}
