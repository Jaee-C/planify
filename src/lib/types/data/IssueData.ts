import { PriorityType, StatusType } from "@/lib/types/index";

export interface IssueFormValues {
  title?: string;
  description?: string;
  status?: number;
  priority?: number;
}

/**
 * react-query does not support class as a return type. This interface is
 * converted to Issue class after passed to react components.
 */
export interface IssueData {
  id: number;
  title: string | undefined;
  description?: string;
  status: StatusType | undefined;
  issueKey: string | undefined;
  priority?: PriorityType;
  order: string | undefined;
}

export interface IssueDetailedData extends IssueData {
  description?: string;
}
