export interface UIIssue {
  id: number;
  project: string;
  title: string;
  assignee: string;
  status: string;
}

export interface ServerIssue {
  id: number;
  project: string;
  title: string;
  assignee: string;
  status: number;
}
