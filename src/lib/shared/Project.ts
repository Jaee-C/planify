export default class Project {
  public id: number;
  public _name: string | undefined;
  public _key: string | undefined;
  public owner: { name: string | null } | undefined;

  public constructor(id: number) {
    this.id = id;
  }

  public set name(name: string) {
    this._name = name;
  }
  public set key(value: string) {
    this._key = value;
  }
  public set ownerName(name: string) {
    this.owner = { name };
  }

  public get name(): string {
    return this._name!;
  }
  public get key(): string {
    return this._key!.toUpperCase();
  }
  public get ownerName(): string {
    if (!this.owner || !this.owner.name) return "None";
    return this.owner.name;
  }

  public toJSONString(): string {
    return JSON.stringify({
      id: this.id,
      name: this.name,
      key: this.key,
    });
  }
}
