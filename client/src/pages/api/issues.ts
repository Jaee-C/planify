import type {NextApiRequest, NextApiResponse} from 'next';
import {Data} from '@/interfaces';

function createData(
  id: number,
  project: string,
  title: string,
  assignee: string,
  status: string
): Data {
  return {id, project, title, assignee, status};
}

const DEFAULT_TODOS = [
  createData(1, 'PRJ', 'Create PoC', 'Daniel', 'In Progress'),
  createData(2, 'PRJ', 'Raise Issues', 'Daniel', 'To Do'),
  createData(3, 'PRJ', 'Update Progress on Issues', 'Daniel', 'To Do'),
  createData(4, 'PRJ', 'Record all issues', 'Daniel', 'To Do'),
  createData(5, 'PRJ', 'Manage Issues', 'Daniel', 'To Do'),
  createData(6, 'PRJ', 'Notify users', 'Daniel', 'To Do'),
];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data[] | string>
) {
  if (req.method === 'GET') {
    res.status(200).json(DEFAULT_TODOS);
  } else if (req.method === 'POST') {
    const {id, project, title, assignee, status} = req.body;
    const newTodo = createData(id, project, title, assignee, status);
    DEFAULT_TODOS.push(newTodo);
    res.status(200).send('DONE.');
  }
}
