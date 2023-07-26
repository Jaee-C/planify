import { User } from "@/lib/types";
import { Issue, Project } from "@/lib/shared";
import IssueRequest from "@/lib/service/Issue/IssueRequest";
import { NewUser } from "@/lib/types/User";
import ProjectRequest from "@/lib/service/ProjectRequest";

export interface IProjectDB {
  fetchAllProjects(): Promise<Project[]>;
  saveProject(req: ProjectRequest): Promise<Project>;
  getDetails(key: string): Promise<Project>;
}

export interface IIssueDB {
  fetchAllIssues(): Promise<Issue[]>;
  saveNewIssue(req: IssueRequest): Promise<Issue>;
  editExistingIssue(req: IssueRequest): Promise<Issue>;
  deleteIssue(id: number): Promise<void>;
  fetchOneIssueWithId(id: number): Promise<Issue | null>;
}

export interface IUserDB {
  getUserByUsername(username: string): Promise<User | null>;
  getUserPassword(username: string): Promise<string | undefined>;
  saveUser(password: string, user: NewUser): Promise<void>;
}
