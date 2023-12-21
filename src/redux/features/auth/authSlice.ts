"use client";
import { authApi } from "../../../api/authApi.ts/page";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface UserState {
  loading: boolean;
  listUser: [];
  listUserDetail: [];
}
export interface LoginType {
  email: string;
  password: string;
}
const initialState: UserState = {
  loading: false,
  listUser: [],
  listUserDetail: [],
};

export const getUsers: any = createAsyncThunk(
  "user/getUsers",
  async (): Promise<any> => {
    try {
      let res: any = await authApi.getUser();
      return res;
    } catch (error: any) {}
  }
);

export const getDetailUsers: any = createAsyncThunk(
  "user/getDetailUsers",
  async (id: any): Promise<any> => {
    try {
      let res: any = await authApi.getDetailUser(id);
      return res;
    } catch (error: any) {}
  }
);

export const postUser: any = createAsyncThunk(
  "user/createUser",
  async (data): Promise<any> => {
    try {
      let res: any = await authApi.postUser(data);
      return res;
    } catch (error: any) {}
  }
);
export const updateUser: any = createAsyncThunk(
  "user/updateUsers",
  async (data): Promise<any> => {
    try {
      let res: any = await authApi.updateUser(data);
      return res;
    } catch (error: any) {}
  }
);
export const deleteUser: any = createAsyncThunk(
  "user/deleteUsers",
  async (id: number): Promise<any> => {
    try {
      let res: any = await authApi.deleteUser(id);
      return res;
    } catch (error: any) {}
  }
);

export const userSlice: any = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.listUser = action.payload?.data;
      state.loading = false;
    });
    builder.addCase(getUsers.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getDetailUsers.fulfilled, (state, action) => {
      state.listUserDetail = action.payload?.data;
      state.loading = false;
    });
    builder.addCase(getDetailUsers.pending, (state, action) => {
      state.loading = true;
    });
  },
});
const { reducer: userReducer } = userSlice;

export default userReducer;
