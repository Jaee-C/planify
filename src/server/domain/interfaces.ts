import { Issue, Project, User } from "@/lib/types";
import IssueRequest from "../service/Issue/IssueRequest";
import { NewUser } from "@/lib/types/User";
import ProjectRequest from "@/server/service/ProjectRequest";

export interface IProjectDB {
  fetchAllProjects(): Promise<Project[]>;
  saveProject(req: ProjectRequest): Promise<Project>;
}

export interface IIssueDB {
  fetchAllIssues(): Promise<Issue[]>;
  saveIssue(req: IssueRequest): Promise<Issue>;
  editIssue(req: IssueRequest): Promise<Issue>;
  deleteIssue(id: number): Promise<void>;
  fetchIssue(id: number): Promise<Issue | null>;
}

export interface IUserDB {
  getUserByUsername(username: string): Promise<User | null>;
  getUserPassword(username: string): Promise<string | undefined>;
  saveUser(password: string, user: NewUser): Promise<void>;
}
