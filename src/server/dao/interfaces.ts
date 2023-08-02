import { UserData } from "@/lib/types";
import { Issue, Project } from "@/lib/shared";
import IssueRequest from "@/server/service/Issue/IssueRequest";
import { NewUser } from "@/lib/types";
import ProjectRequest from "@/server/service/ProjectRequest";

export interface IProjectDB {
  fetchAllProjects(): Promise<Project[]>;
  saveProject(req: ProjectRequest): Promise<Project>;
  getDetails(key: string): Promise<Project>;
  editProject(req: ProjectRequest, key: string): Promise<Project>;
}

export interface IIssueDB {
  fetchAllIssues(): Promise<Issue[]>;
  saveNewIssue(req: IssueRequest): Promise<Issue>;
  editExistingIssue(req: IssueRequest): Promise<Issue>;
  deleteIssue(id: number): Promise<void>;
  fetchOneIssueWithId(id: number): Promise<Issue | null>;
}

export interface IUserDB {
  getUserByUsername(username: string): Promise<UserData | null>;
  getUserPassword(username: string): Promise<string | undefined>;
  saveUser(password: string, user: NewUser): Promise<void>;
}
