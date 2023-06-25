import { UIIssue } from "@/interfaces";

export type StatusType = 1 | 2 | 3;

export const ISSUE_STATUSES = [
  {
    label: "Done",
    value: 3,
  },
  {
    label: "In Progress",
    value: 2,
  },
  {
    label: "To Do",
    value: 1,
  },
];

export const ISSUE_PRIORITIES = [
  {
    label: "High",
    value: "high",
  },
  {
    label: "Medium",
    value: "medium",
  },
  {
    label: "Low",
    value: "low",
  },
];

export interface formValues extends UIIssue {
  description?: string;
  reporter?: string;
  priority?: string;
}

export const EMPTY_FORM: formValues = {
  id: undefined,
  title: undefined,
  description: undefined,
  assignee: undefined,
  reporter: undefined,
  status: 1,
  priority: "low",
};
