import IssueRepository, {
  EditIssuePayload,
  IssueTarget,
  NewIssuePayload,
} from "@/server/dao/IssueRepository";
import { IssueData } from "@/lib/types";
import { NextApiRequest } from "next";
import { IssueDetailedData } from "@/lib/types/data/IssueData";

export default class IssueService {
  private readonly _target: IssueTarget;

  public constructor(pKey: string, orgKey: string) {
    this._target = {
      organisation: orgKey,
      project: pKey,
    };
  }

  public async getAllIssues(): Promise<IssueData[]> {
    return IssueRepository.fetchAllIssues(this._target);
  }

  public async saveIssue(req: NextApiRequest): Promise<IssueData> {
    const data = this.parseSaveInput(req);
    const res = await IssueRepository.createIssue(this._target, data);

    if (res == null) {
      throw new Error("CHECHE'S ERROR, ISSUE ERROR NOT YET IMPLEMENTED");
    }

    return res;
  }

  public async getOneIssue(key: string): Promise<IssueDetailedData> {
    const res = await IssueRepository.fetchOneIssue({
      ...this._target,
      issueKey: key,
    });

    if (res === null) {
      throw new Error("CHECHE'S ERROR, ISSUE ERROR NOT YET IMPLEMENTED");
    }

    return res;
  }

  public async editIssue(req: NextApiRequest, key: string): Promise<IssueData> {
    const data = this.parseEditInput(req);

    const res = await IssueRepository.editIssue(
      this.addIssueKeyToTarget(key),
      data
    );

    if (res == null) {
      throw new Error("CHECHE'S ERROR, ISSUE ERROR NOT YET IMPLEMENTED");
    }

    return res;
  }

  public async deleteIssue(key: string) {
    await IssueRepository.deleteIssue(this.addIssueKeyToTarget(key));
  }

  private addIssueKeyToTarget(key: string): IssueTarget {
    return {
      ...this._target,
      issueKey: key,
    };
  }

  private parseSaveInput(req: NextApiRequest): NewIssuePayload {
    return {
      title: req.body.title,
    };
  }

  private parseEditInput(req: NextApiRequest): EditIssuePayload {
    return {
      title: req.body.title,
      status: req.body.status,
      order: req.body.order,
    };
  }
}
