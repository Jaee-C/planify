import StatusType from "../../types/StatusType";
import PriorityType from "../../types/PriorityType";
import { LexoRank } from "lexorank";

export { default as IssueRequest } from "./IssueRequest";

export { default as createIssueRequest } from "./NextjsIssueRequest";

export default class Issue {
  public id: number;
  public title: string;
  public assignee?: string;
  public description?: string;
  public reporter?: string;
  public status: StatusType;
  public issueKey: string;
  public priority: PriorityType;
  public order: LexoRank;

  constructor(
    id: number,
    title: string,
    status: StatusType,
    priority: PriorityType,
    key: string,
    order: LexoRank
  ) {
    this.id = id;
    this.title = title;
    this.status = status;
    this.priority = priority;
    this.issueKey = key;
    this.order = order;
  }

  public compareTo(other: Issue): number {
    if (!this.order || !other.order) {
      return 0;
    }

    return this.order.compareTo(other.order);
  }

  public placeAfter(other: Issue): void {
    if (!other.order) {
      other.initializeOrder();
    }
    this.order = other.order!.genNext();
  }

  public placeBefore(other: Issue): void {
    if (!other.order) {
      other.initializeOrder();
    }
    this.order = other.order!.genPrev();
  }

  public initializeOrder(): void {
    this.order = LexoRank.middle();
  }
}
