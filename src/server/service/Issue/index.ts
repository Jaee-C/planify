export default class Index {
  public id: number;
  public title: string | undefined;
  public assignee: string | undefined;
  public status: number | undefined;

  public constructor(id: number) {
    this.id = id;
  }
}
