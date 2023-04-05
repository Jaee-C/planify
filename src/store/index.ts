import {configureStore} from '@reduxjs/toolkit';

import TodoSlice from '@/components/IssueTable/TodosSlice';

const store = configureStore({
  reducer: {
    todo: TodoSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
