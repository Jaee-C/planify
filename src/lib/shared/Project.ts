import { ProjectData } from "@/lib/types";

export default class Project {
  private readonly _data: ProjectData;

  public constructor(id: number) {
    this._data = { id };
  }

  public set name(name: string) {
    this._data.name = name;
  }
  public set key(value: string) {
    this._data.key = value;
  }
  public set ownerName(name: string) {
    this._data.owner = { displayName: name };
  }

  public get id(): number {
    return this._data.id;
  }
  public get name(): string {
    if (!this._data.name) return "";
    return this._data.name;
  }
  public get key(): string {
    if (!this._data.key) return "";
    return this._data.key.toUpperCase();
  }
  public get ownerName(): string {
    if (!this._data.owner || !this._data.owner.displayName) return "None";
    return this._data.owner.displayName;
  }

  public serialiseToData(): ProjectData {
    return this._data;
  }
}

export function convertDataToProject(data: ProjectData): Project {
  const project = new Project(data.id);
  project.name = data.name ?? "";
  project.key = data.key ?? "";
  project.ownerName = data.owner?.displayName ?? "None";
  return project;
}
