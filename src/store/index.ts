import {configureStore} from '@reduxjs/toolkit';

import TodoSlice from '@/components/IssueTable/TodoSlice';

const store = configureStore({
  reducer: {
    todo: TodoSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
