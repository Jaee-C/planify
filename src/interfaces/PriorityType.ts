export default class PriorityType {
  public id: number;
  public value: string;

  public constructor(id: number, priority: string) {
    this.id = id;
    this.value = priority;
  }
}
