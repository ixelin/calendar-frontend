import { configureStore } from "@reduxjs/toolkit";
import calendarSlice from "../features/Calendar/calendarSlice";
import userSlice from "../features/user/userSlice";
//? basic redux toolkit store
const store = configureStore({
  reducer: {
    calendar: calendarSlice,
    user: userSlice,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;