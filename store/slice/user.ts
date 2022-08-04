import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { userT } from "../../types";

export const setUser = createAsyncThunk("user/setUser", async () => {
  return (await axios.get<userT>("http://localhost:3000/api/user")).data;
});

const userReducer = createSlice({
  name: "user",
  initialState: {
    user: {} as userT,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setUser.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});

export default userReducer.reducer;
