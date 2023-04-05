import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {Data} from '@/interfaces';

interface State {
  count: number;
  todos: Data[];
}

const initialState: State = {
  count: 0,
  todos: [],
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Data>) => {
      state.todos.push(action.payload);
      state.count += 1;
    },
    removeTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter(todo => todo.key !== action.payload);
      state.count -= 1;
    },
    setTodos: (state, action: PayloadAction<Data[]>) => {
      state.todos = action.payload;
      state.count = action.payload.length;
    },
  },
});

export const {addTodo, removeTodo, setTodos} = todosSlice.actions;
export default todosSlice.reducer;
