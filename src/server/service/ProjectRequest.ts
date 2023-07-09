export default class ProjectRequest {
  public name?: string;
  public key?: string;
  public description?: string;
  public ownerId?: number;

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
