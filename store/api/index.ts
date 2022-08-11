import { User } from "@prisma/client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { chatMenuT, chatT, serverMessageT, userT } from "../../types";

export const api = createApi({
  reducerPath: "api",
  tagTypes: ["chats", "chat", "user"],
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/" }),
  endpoints: (builder) => ({
    getChats: builder.query<chatMenuT[], void>({
      query: () => ({
        url: `api/chats`,
      }),
      providesTags: ["chats"],
    }),
    getChatById: builder.query<chatT, number>({
      query: (id) => ({
        url: `api/chat`,
        params: {
          id,
        },
      }),
      providesTags: (result, error, arg) => {
        return [{ type: "chat", id: arg }];
      },
    }),
    createChat: builder.mutation<
      serverMessageT,
      { email1: string; email2: string }
    >({
      query: (body) => ({
        url: "/api/chat",
        method: "POST",
        body,
      }),
      invalidatesTags: ["chats"],
    }),
    getUser: builder.query<userT, void>({
      query: () => `api/user`,
      providesTags: ["user"],
    }),
    signup: builder.mutation<
      serverMessageT,
      { cb: () => Promise<void>; user: Omit<User, "id"> }
    >({
      query: ({ user: body }) => ({
        url: "api/signup",
        method: "POST",
        body,
      }),
      onQueryStarted: async ({ cb }, { queryFulfilled, dispatch }) => {
        try {
          await queryFulfilled;
          await cb();
        } catch (e) {
          console.log(e);
        }
      },
    }),
    signin: builder.mutation<
      serverMessageT,
      { cb: () => Promise<void>; user: Omit<User, "id" | "name"> }
    >({
      query: ({ user: body }) => ({
        url: "api/signin",
        method: "POST",
        body,
      }),
      onQueryStarted: async ({ cb }, { queryFulfilled, dispatch }) => {
        try {
          await queryFulfilled;
          await cb();
        } catch (e) {
          console.log(e);
        }
      },
    }),
    signout: builder.mutation<serverMessageT, () => Promise<void>>({
      query: () => "api/signout",
      onQueryStarted: async (cb, { queryFulfilled, dispatch }) => {
        try {
          await queryFulfilled;
          await cb();
          dispatch(api.util.resetApiState());
        } catch (e) {
          console.log(e);
        }
      },
    }),
  }),
});

export const {
  useGetChatsQuery,
  useCreateChatMutation,
  useGetChatByIdQuery,
  useGetUserQuery,
  useSignoutMutation,
  useSigninMutation,
  useSignupMutation,
} = api;
