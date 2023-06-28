export default class Project {
  public id: number;
  public name: string | undefined;
  public key: string | undefined;

  public constructor(id: number) {
    this.id = id;
  }
}
