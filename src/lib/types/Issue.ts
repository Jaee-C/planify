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

/**
 * react-query does not support class as a return type. This interface is
 * converted to Issue class after passed to react components.
 */
export interface IssueData {
  id: number;
  title: string | undefined;
  description?: string;
  status: StatusType | undefined;
  issueKey: string | undefined;
  priority?: PriorityType;
  order: string | undefined;
}

export function convertDataToIssue(data: IssueData): Issue {
  const newIssue: Issue = new Issue(data.id);

  newIssue.title = data.title;
  newIssue.description = data.description;
  newIssue.status = data.status;
  newIssue.issueKey = data.issueKey;
  newIssue.priority = data.priority;
  newIssue.order = data.order;

  return newIssue;
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
