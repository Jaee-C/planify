import { Issue, Project, User } from "@/lib/types";
import IssueRequest from "../service/Issue/IssueRequest";
import { NewUser } from "@/lib/types/User";

export interface IProjectDB {
  fetchAllProjects(): Promise<Project[]>;
}

export interface IIssueDB {
  fetchAllIssues(): Promise<Issue[]>;
  saveIssue(req: IssueRequest): Promise<Issue>;
  editIssue(req: IssueRequest): Promise<void>;
  deleteIssue(id: number): Promise<void>;
}

export interface IUserDB {
  getUserByUsername(username: string): Promise<User | null>;
  getUserPassword(username: string): Promise<string | undefined>;
  saveUser(password: string, user: NewUser): Promise<void>;
}
