import {createSlice} from '@reduxjs/toolkit';

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
  return {
    key,
    title,
    assignee,
    status,
  };
}

const DEFAULT_TODOS = [
  createData('PRJ-1', 'Create PoC', 'Daniel', 'In Progress'),
  createData('PRJ-2', 'Raise Issues', 'Daniel', 'To Do'),
  createData('PRJ-3', 'Update Progress on Issues', 'Daniel', 'To Do'),
  createData('PRJ-4', 'Record all issues', 'Daniel', 'To Do'),
  createData('PRJ-5', 'Manage Issues', 'Daniel', 'To Do'),
  createData('PRJ-6', 'Notify users', 'Daniel', 'To Do'),
];

const initialState = {
  count: 0,
  todos: DEFAULT_TODOS,
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todos.push(action.payload);
      state.count += 1;
    },
    removeTodo: (state, action) => {
      state.todos = state.todos.filter(todo => todo.key !== action.payload);
      state.count -= 1;
    },
  },
});

export const {addTodo, removeTodo} = todosSlice.actions;
export default todosSlice.reducer;
