import StatusType from "./StatusType";
import PriorityType from "./PriorityType";
import { LexoRank } from "lexorank";

export default class Issue {
  public id: number;
  public title: string | undefined;
  public assignee: string | undefined;
  public description: string | undefined;
  public reporter: string | undefined;
  public status: StatusType | undefined;
  public issueKey: string | undefined;
  public priority: PriorityType | undefined;
  private _order: LexoRank | undefined;

  public constructor(id: number) {
    this.id = id;
  }

  get order(): string | undefined {
    return this._order?.toString();
  }

  set order(value: string | undefined) {
    if (value) this._order = LexoRank.parse(value);
  }

  public static compareTo(current: Issue, other: Issue): number {
    if (!current.order || !other.order) {
      return 0;
    }

    return -LexoRank.parse(current.order).compareTo(
      LexoRank.parse(other.order)
    );
  }

  public placeAfter(other: Issue): void {
    if (!other.order) {
      other.initializeOrder();
    }
    this._order = LexoRank.parse(other.order!).genNext();
  }

  public placeBefore(other: Issue): void {
    if (!other.order) {
      other.initializeOrder();
    }
    this._order = LexoRank.parse(other.order!).genPrev();
  }

  public initializeOrder(): void {
    this._order = LexoRank.middle();
  }
}

export function compareIssue(current: Issue, other: Issue): number {
  if (!current.order || !other.order) {
    return 0;
  }

  return LexoRank.parse(current.order).compareTo(LexoRank.parse(other.order));
}

export function placeAfter(current: Issue, other: Issue): void {
  if (!other.order) {
    other.order = LexoRank.middle().toString();
  }
  current.order = LexoRank.parse(other.order!).genNext().toString();
}

export function placeBefore(current: Issue, other: Issue): void {
  if (!other.order) {
    other.order = LexoRank.middle().toString();
  }
  current.order = LexoRank.parse(other.order!).genPrev().toString();
}

export class IssueResponse {
  public data: any;

  public constructor(data: Issue[]) {
    this.data = data.map(issue => ({
      id: issue.id,
      title: issue.title,
      status: issue.status,
      issueKey: issue.issueKey,
      priority: issue.priority,
      order: issue.order?.toString(),
    }));
  }

  public toJSONString(): string {
    return JSON.stringify({ data: this.data });
  }
}
