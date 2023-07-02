import { PriorityType } from "@/lib/types";
import { prisma } from "@/server/domain/prisma";
import { Prisma } from "@prisma/client";

export default class PriorityRepository {
  private readonly _projectKey: string;

  public constructor(pKey: string) {
    this._projectKey = pKey;
  }

  public async fetchPriorities(): Promise<PriorityType[]> {
    const payload: PriorityPayload[] = await prisma.priorityType.findMany({
      select: prioritySelect,
    });

    return payload.map((priority: PriorityPayload) =>
      this.convertToPriorityType(priority)
    );
  }

  private convertToPriorityType(dbPriority: PriorityPayload): PriorityType {
    return {
      id: dbPriority.id,
      value: dbPriority.name,
    };
  }
}

const prioritySelect = {
  id: true,
  name: true,
} satisfies Prisma.PriorityTypeSelect;

type PriorityPayload = Prisma.PriorityTypeGetPayload<{
  select: typeof prioritySelect;
}>;
