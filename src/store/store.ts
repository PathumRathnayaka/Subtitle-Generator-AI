import { configureStore } from '@reduxjs/toolkit';
import subtitleReducer from './subtitleSlice';

export const store = configureStore({
  reducer: {
    subtitles: subtitleReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;