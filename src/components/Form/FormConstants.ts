export const ISSUE_STATUSES = [
  {
    label: 'Done',
    value: 'Done',
  },
  {
    label: 'In Progress',
    value: 'In Progress',
  },
  {
    label: 'To Do',
    value: 'To Do',
  },
];

export const ISSUE_PRIORITIES = [
  {
    label: 'High',
    value: 'high',
  },
  {
    label: 'Medium',
    value: 'medium',
  },
  {
    label: 'Low',
    value: 'low',
  },
];

interface formValues {
  key?: string;
  title?: string;
  description?: string;
  assignee?: string;
  reporter?: string;
  status?: string;
  priority?: string;
}

export const EMPTY_FORM: formValues = {
  key: undefined,
  title: undefined,
  description: undefined,
  assignee: undefined,
  reporter: undefined,
  status: 'To Do',
  priority: 'low',
};
