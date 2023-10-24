import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TUser } from "../../types/User";
interface TInitialState {
  user: TUser | null;
}

const initialState: TInitialState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<TUser | null>) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;