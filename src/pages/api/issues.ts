import type {NextApiRequest, NextApiResponse} from 'next';

interface Data {
  key: string;
  title: string;
  assignee: string;
  status: string;
}

function createData(
  key: string,
  title: string,
  assignee: string,
  status: string
): Data {
  return {key, title, assignee, status};
}

const DEFAULT_TODOS = [
  createData('PRJ-1', 'Create PoC', 'Daniel', 'In Progress'),
  createData('PRJ-2', 'Raise Issues', 'Daniel', 'To Do'),
  createData('PRJ-3', 'Update Progress on Issues', 'Daniel', 'To Do'),
  createData('PRJ-4', 'Record all issues', 'Daniel', 'To Do'),
  createData('PRJ-5', 'Manage Issues', 'Daniel', 'To Do'),
  createData('PRJ-6', 'Notify users', 'Daniel', 'To Do'),
];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data[]>
) {
  res.status(200).json(DEFAULT_TODOS);
}
