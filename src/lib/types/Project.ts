export default class Project {
  public id: number;
  public name: string | undefined;
  public key: string | undefined;
  public owner: { name: string | null } | undefined;

  public constructor(id: number) {
    this.id = id;
  }
}
