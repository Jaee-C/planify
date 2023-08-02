import IssueRequest from "@/server/service/Issue/IssueRequest";

describe("saveStatus", (): void => {
  it("valid status", (): void => {
    const request: IssueRequest = new IssueRequest();
    request.saveStatus(1);

    expect(request.status).toBe(1);
  });

  it("negative value", (): void => {
    const request: IssueRequest = new IssueRequest();
    request.saveStatus(-1);

    expect(request.status).toBeUndefined();
  });

  it("undefined value", (): void => {
    const request: IssueRequest = new IssueRequest();
    // @ts-ignore
    request.saveStatus(undefined);

    expect(request.status).toBeUndefined();
  });

  it("NaN value", (): void => {
    const request: IssueRequest = new IssueRequest();
    request.saveStatus(NaN);

    expect(request.status).toBeUndefined();
  });
});

describe("verifyEntries", (): void => {
  it("valid entries", (): void => {
    const request: IssueRequest = new IssueRequest();
    request.title = "title";
    request.assignee = "user1";
    request.saveStatus(1);

    expect(request.verifyEntries()).toBeTruthy();
  });

  it("invalid title", (): void => {
    const request: IssueRequest = new IssueRequest();
    request.assignee = "user1";
    request.saveStatus(1);

    expect(request.verifyEntries()).toBeFalsy();

    request.title = "";
    expect(request.verifyEntries()).toBeFalsy();
  });

  it("invalid status", (): void => {
    const request: IssueRequest = new IssueRequest();
    request.title = "title";
    request.assignee = "user1";

    expect(request.verifyEntries()).toBeFalsy();

    request.saveStatus(0);
    expect(request.verifyEntries()).toBeFalsy();

    request.saveStatus(4);
    expect(request.verifyEntries()).toBeFalsy();

    request.saveStatus(NaN);
    expect(request.verifyEntries()).toBeFalsy();
  });
});
