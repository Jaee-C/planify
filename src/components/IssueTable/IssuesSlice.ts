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

const issuesSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addIssue: (state, action: PayloadAction<Data>) => {
      state.todos.push(action.payload);
      fetch('/api/issues', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(action.payload),
      }).then(res => {
        if (res.status === 200) {
          console.log('Added issue successfully.');
        }
      });
      state.count += 1;
    },
    removeIssue: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter(todo => todo.key !== action.payload);
      state.count -= 1;
    },
    setIssues: (state, action: PayloadAction<Data[]>) => {
      state.todos = action.payload;
      state.count = action.payload.length;
    },
  },
});

export const {addIssue, removeIssue, setIssues} = issuesSlice.actions;
export default issuesSlice.reducer;
