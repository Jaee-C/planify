export default class IssueRequest {
  public id?: number = undefined;
  public title?: string = undefined;
  public description?: string = undefined;
  public status?: number;
  public assignee?: string;

  public saveStatus(value: number): void {
    if (Number.isNaN(value)) {
      return;
    }
    if (value < 1 || value > 3) {
      return;
    }

    this.status = value;
  }

  public verifyEntries(): boolean {
    return this.verifyStatus() && this.verifyTitle();
  }

  private verifyStatus(): boolean {
    if (Number.isNaN(this.status) || this.status === undefined) {
      // console.log("Status is not a number.");
      return false;
    }

    if (this.status < 1 || this.status > 3) {
      // console.log("Invalid status");
      return false;
    }

    return true;
  }

  private verifyTitle(): boolean {
    if (this.title === undefined) {
      return false;
    }

    if (this.title.length === 0) {
      return false;
    }

    return true;
  }
}
