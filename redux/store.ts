import { configureStore } from '@reduxjs/toolkit';
// You will create these slices soon:
import userReducer from '../features/user/userSlice';
import contentReducer from '../features/content/contentSlice';
import uiReducer from "../features/ui/uiSlice"

export const store = configureStore({
  reducer: {
    user: userReducer,
    content: contentReducer,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
