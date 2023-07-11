import { PriorityType, StatusType } from "@/lib/types";

export const NONE_STATUS: StatusType = { id: -1, name: "None" };

export const NONE_PRIORITY: PriorityType = { id: -1, name: "None" };

// Cache refetching intervals in milliseconds
export const STALE_TIME = 1000 * 60 * 10; // 10 minutes

export const ALERT_DURATION = 1000 * 10;
