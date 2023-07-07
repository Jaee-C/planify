import { StatusType } from "lib/types";
import StatusRepository from "@/server/domain/StatusRepository";

export default class IssueRequest {
  public id?: number = undefined;
  public title?: string = undefined;
  public description?: string = undefined;
  public status?: number;
  public assignee?: string;
  public key?: string;

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
