interface ProjectData {
  name: string;
  key: string;
  description: string;
  ownerId: number;
}

export default class ProjectRequest {
  public name?: string;
  public key?: string;
  public description?: string;
  public ownerId?: number;

  public exportObject(): ProjectData {
    if (!this.isValidRequest()) {
      throw new Error("Invalid request");
    }
    return {
      name: this.name!,
      key: this.key!,
      description: this.description!,
      ownerId: this.ownerId!,
    };
  }

  public isValidRequest(): boolean {
    if (!this.ownerId) {
      console.log("No owner");
      return false;
    }

    if (!this.name) {
      console.log("No name");
      return false;
    }

    if (!this.key) {
      console.log("No key");
      return false;
    }
    return true;
  }
}
