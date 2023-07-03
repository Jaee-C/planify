export default class PriorityType {
  public id: number;
  public name: string;

  public constructor(id: number, priority: string) {
    this.id = id;
    this.name = priority;
  }
}
