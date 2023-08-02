import StatusRepository from "@/server/dao/StatusRepository";
import { StatusType } from "@/lib/types";

export default class StatusService {
  private readonly _store: StatusRepository;

  public constructor(projectKey: string) {
    this._store = new StatusRepository(projectKey);
  }

  public async statusExists(statusId?: number): Promise<boolean> {
    if (Number.isNaN(statusId)) return false;

    const statuses: StatusType[] = await this.getStatuses();
    return statuses.some((status: StatusType) => status.id === statusId);
  }

  public validStatusFormat(status: StatusType): boolean {
    return status.name.length > 0;
  }

  private async getStatuses(): Promise<StatusType[]> {
    return this._store.fetchStatuses();
  }
}
