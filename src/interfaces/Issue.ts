import StatusType from "./StatusType";

export default class Issue {
  public id: number;
  public title: string | undefined;
  public assignee: string | undefined;
  public description: string | undefined;
  public reporter: string | undefined;
  public status: number | undefined;
  public issueKey: string | undefined;
  public priority: string | undefined;

  public constructor(id: number) {
    this.id = id;
  }

  get editing(): boolean {
    return this.id > 0;
  }
}

export class IssueResponse {
  public data: Issue[];
  public statuses: StatusType[];

  public constructor(data: Issue[], statuses: StatusType[]) {
    this.data = data;
    this.statuses = statuses;
  }
}
