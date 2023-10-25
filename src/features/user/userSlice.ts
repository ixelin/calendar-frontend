import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TUser } from "../../types/User";
import axios from "axios";
import { API } from "../../enums/api";
import axiosRequest from "../../api/axios";
interface TInitialState {
  user: TUser | null;
  loading: boolean;
}

const initialState: TInitialState = {
  user: null,
  loading: false,
};

export const registerUser = createAsyncThunk('/register', async (data: {username:string, password:string}) => {
  const res = await axios.post(API.REGISTER, {username: data.username, password: data.password });
  return res.data;
})

export const loginUser = createAsyncThunk('/login', async (data: {username:string, password:string}) => {
  console.log('loginUser dispatched')
  const res = await axios.post(API.LOGIN, {username: data.username, password: data.password });
  localStorage.setItem('token', `Bearer ${res.data.token}`);
  return res.data;
})

export const getUser = createAsyncThunk('/getuser', async () => {
  const res = await axiosRequest.get(API.GET_USER_INFO);
  return res.data;
})

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<TUser | null>) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
    })
    builder.addCase(registerUser.fulfilled, (state) => {
      state.loading = false;
    })
    builder.addCase(registerUser.rejected, (state) => {
      state.loading = false;
    })
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
    })
    builder.addCase(loginUser.fulfilled, (state, data) => {
      state.loading = false;
      state.user = data.payload.data;
    })
    builder.addCase(loginUser.rejected, (state, data) => {
      state.loading = false;
      console.log(data.error);
    })
    builder.addCase(getUser.pending, (state) => {
      state.loading = true;
    })
    builder.addCase(getUser.fulfilled, (state, data) => {
      state.loading = false;
      state.user = data.payload;
    })
    builder.addCase(getUser.rejected, (state, data) => {
      state.loading = false;
      console.log(data.error);
    })
  }
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;