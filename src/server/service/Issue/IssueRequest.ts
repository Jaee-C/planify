import { IssueFormValues, StatusType } from "@/lib/types";
import StatusRepository from "@/server/domain/StatusRepository";
import { LexoRank } from "lexorank";
import { serverOnly } from "@/lib/utils";
import StatusService from "@/server/service/StatusService";

export default class IssueRequest {
  private _id?: number = undefined;
  private readonly values: IssueFormValues = {};
  private _order?: LexoRank;
  private _statusDb: StatusRepository | null = null;
  private _key?: string = undefined;

  public constructor(value: IssueFormValues) {
    serverOnly();
    this.values = { ...value };
  }

  public get id(): number | undefined {
    return this._id;
  }
  public get order(): string {
    return this._order?.toString() || "";
  }
  public get priority(): number | undefined {
    return this.values.priority;
  }
  public get status(): number | undefined {
    return this.values.status;
  }
  public get title(): string | undefined {
    return this.values.title;
  }

  public set order(value: string) {
    this._order = LexoRank.parse(value);
  }
  public set key(value: string) {
    if (value.length > 10) return;
    this._key = value;
    this.saveIdWithKey(value);
  }

  public getEncodedDescription(): Buffer | undefined {
    if (!this.validDescription()) return undefined;
    return Buffer.from(this.values.description!);
  }

  public saveStatus(value: number): void {
    if (Number.isNaN(value)) {
      return;
    }

    this.values.status = value;
  }

  public async verifyEditEntries(status: StatusService): Promise<boolean> {
    return Boolean(this._key) && this.verifyEntries(status);
  }

  public async verifyEntries(status: StatusService): Promise<boolean> {
    return (await status.statusExists(this.status)) && this.verifyTitle();
  }

  private verifyTitle(): boolean {
    return !(this.title === undefined || this.title.length === 0);
  }

  private isNumber(value?: number): boolean {
    if (value === undefined || Number.isNaN(value)) {
      console.error("Value is not a number");
      return false;
    }
    return true;
  }

  private async getValidStatuses(): Promise<number[]> {
    if (!this.statusDbExists()) return [];

    return (await this._statusDb!.fetchStatuses()).map(
      (value: StatusType): number => value.id
    );
  }

  private statusDbExists(): boolean {
    if (this._statusDb === null) {
      console.error("Status repository not set");
      return false;
    }
    return true;
  }

  private validDescription(): boolean {
    return (
      this.values.description !== undefined &&
      this.values.description.length > 0
    );
  }

  private saveIdWithKey(key: string): void {
    const splitKey: string[] = key.split("-");
    const extractedId: number = Number(splitKey[1]);

    if (Number.isNaN(extractedId)) {
      throw new Error("Invalid issue key");
    }
    this._id = extractedId;
  }
}
