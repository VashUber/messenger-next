import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { userT } from "../../types";

const fetchUser = createAsyncThunk("setuser", async () => {
  return (await axios.get<userT>("http://localhost:3000/api/user")).data;
});

const userReducer = createSlice({
  name: "user",
  initialState: {
    user: {} as userT,
  },
  reducers: {
    setUser: (state) => {
      state.user;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});

export const { setUser } = userReducer.actions;

export default userReducer.reducer;
