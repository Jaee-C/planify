import { IssueData, PriorityType, StatusType } from "@/lib/types";
import { LexoRank } from "lexorank";

export default class Issue {
  public id: number;
  public title: string | undefined;
  public assignee: string | undefined;
  public description: string | undefined;
  public status: StatusType | undefined;
  public issueKey: string | undefined;
  public priority: PriorityType | undefined;
  private _serialisedOrder: LexoRank | undefined;

  public constructor(id: number) {
    this.id = id;
  }

  get serialisedOrder(): string | undefined {
    return this._serialisedOrder?.toString();
  }
  get order(): LexoRank | undefined {
    return this._serialisedOrder;
  }
  set serialisedOrder(value: string | undefined) {
    if (value) this._serialisedOrder = LexoRank.parse(value);
  }

  public placeAfter(other: Issue): void {
    if (!other.serialisedOrder) {
      other.initializeOrder();
    }
    this._serialisedOrder = other.order!.genNext();
  }
  public placeBefore(other: Issue): void {
    if (!other.serialisedOrder) {
      other.initializeOrder();
    }
    this._serialisedOrder = other.order!.genPrev();
  }
  public placeBetween(before: Issue, after: Issue): void {
    if (!before.serialisedOrder) {
      before.initializeOrder();
    }
    if (!after.serialisedOrder) {
      after.initializeOrder();
    }

    this._serialisedOrder = before.order!.between(after.order!);
  }
  public initializeOrder(): void {
    this._serialisedOrder = LexoRank.middle();
  }

  public serialiseToData(): IssueData {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      status: this.status,
      issueKey: this.issueKey,
      priority: this.priority,
      order: this.serialisedOrder?.toString(),
    };
  }
}

export function compareIssue(current: Issue, other: Issue): number {
  if (!current.order || !other.order) {
    return 0;
  }

  return current.order.compareTo(other.order);
}

export function convertDataToIssue(data: IssueData): Issue {
  const newIssue: Issue = new Issue(data.id);

  newIssue.title = data.title;
  newIssue.description = data.description;
  newIssue.status = data.status;
  newIssue.issueKey = data.issueKey;
  newIssue.priority = data.priority;
  newIssue.serialisedOrder = data.order;

  return newIssue;
}
