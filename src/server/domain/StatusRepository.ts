import "server-only";

import { StatusType } from "@/lib/types";
import { prisma } from "@/server/domain/prisma";
import { Prisma } from "@prisma/client";

export default class StatusRepository {
  private readonly _projectKey: string;

  public constructor(pKey: string) {
    this._projectKey = pKey;
  }

  public async fetchStatuses(): Promise<StatusType[]> {
    const dbStatuses: StatusPayload[] = await prisma.statusType.findMany({
      select: statusSelect,
    });
    return dbStatuses.map(
      (dbStatus: StatusPayload): StatusType =>
        this.convertToStatusType(dbStatus)
    );
  }

  private convertToStatusType(dbStatus: StatusPayload): StatusType {
    return {
      id: dbStatus.id,
      name: dbStatus.name,
    };
  }
}

const statusSelect = {
  id: true,
  name: true,
} satisfies Prisma.StatusTypeSelect;

type StatusPayload = Prisma.StatusTypeGetPayload<{
  select: typeof statusSelect;
}>;
