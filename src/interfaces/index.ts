export interface UIIssue {
  id?: number;
  key?: string;
  title?: string;
  assignee?: string;
  status: number;
}

export interface ServerIssue {
  id: number;
  title: string;
  assignee: string;
  status: number;
}
