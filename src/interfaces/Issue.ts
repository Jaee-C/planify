import StatusType from "./StatusType";
import PriorityType from "./PriorityType";

export default class Issue {
  public id: number;
  public title: string | undefined;
  public assignee: string | undefined;
  public description: string | undefined;
  public reporter: string | undefined;
  public status: number | undefined;
  public issueKey: string | undefined;
  public priority: number | undefined;

  public constructor(id: number) {
    this.id = id;
  }

  get editing(): boolean {
    return this.id > 0;
  }
}

export class IssueResponse {
  public readonly data: Issue[];
  public readonly statuses: StatusType[];
  public readonly priorities: PriorityType[];

  public constructor(
    data: Issue[],
    statuses: StatusType[],
    priorities: PriorityType[]
  ) {
    this.data = data;
    this.statuses = statuses;
    this.priorities = priorities;
  }
}
