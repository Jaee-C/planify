import StatusType from "./StatusType";

export default class Issue {
  public id: number;
  public title: string | undefined;
  public assignee: string | undefined;
  public status: number | undefined;
  public issueKey: string | undefined;

  public constructor(id: number) {
    this.id = id;
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
