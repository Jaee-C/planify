import { PriorityType, StatusType } from "@/lib/types";
import StatusRepository from "@/server/domain/StatusRepository";
import { LexoRank } from "lexorank";
import Issue from "./index";

export interface IssueFormValues {
  title?: string;
  description?: string;
  status?: number;
  priority?: number;
}

export default class IssueRequest implements IssueFormValues {
  public id?: number = undefined;
  public title?: string = undefined;
  public description?: string = undefined;
  public status?: number;
  public priority?: number;
  public assignee?: string;
  public key?: string;
  private _order?: LexoRank;
  private _validStatuses?: StatusType[];
  private _validPriorities?: PriorityType[];

  public set order(value: string) {
    this._order = LexoRank.parse(value);
  }
  public set validStatuses(value: StatusType[]) {
    this._validStatuses = value;
  }
  public set validPriorities(value: PriorityType[]) {
    this._validPriorities = value;
  }

  public constructor(value: IssueFormValues) {
    this.title = value.title;
    this.description = value.description;
    this.status = value.status;
    this.priority = value.priority;
  }

  public get order(): string {
    return this._order?.toString() || "";
  }

  public createIssue(): Issue | undefined {
    let newIssue: Issue | undefined = undefined;
    if (!this._validPriorities || !this._validStatuses) {
      return undefined;
    }

    // Find issue and priority type
    const foundPriority = this._validPriorities.find(
      priority => priority.id === this.priority
    );
    const foundStatus = this._validStatuses.find(
      status => status.id === this.status
    );

    if (
      this.id &&
      this.title &&
      foundStatus &&
      foundPriority &&
      this.key &&
      this._order
    ) {
      newIssue = new Issue(
        this.id,
        this.title,
        foundStatus,
        foundPriority,
        this.key,
        this._order
      );
    }

    if (newIssue) {
      if (this.assignee) {
        newIssue.assignee = this.assignee;
      }
      if (this.description) {
        newIssue.description = this.description;
      }
    }
    return newIssue;
  }

  public saveStatus(value: number): void {
    if (Number.isNaN(value)) {
      return;
    }

    this.status = value;
  }

  public async verifyEntries(db: StatusRepository): Promise<boolean> {
    return (await this.verifyStatus(db)) && this.verifyTitle();
  }

  private async verifyStatus(db: StatusRepository): Promise<boolean> {
    if (Number.isNaN(this.status) || this.status === undefined) {
      console.log("Status is not a number.");
      return false;
    }

    // Status provided is not defined in database
    const validStatuses: number[] = (await db.fetchStatuses()).map(
      (value: StatusType): number => value.id
    );
    if (validStatuses.indexOf(this.status) === -1) {
      console.log("Invalid status");
      return false;
    }

    return true;
  }

  private verifyTitle(): boolean {
    if (this.title === undefined) {
      return false;
    }

    if (this.title.length === 0) {
      return false;
    }

    return true;
  }
}
