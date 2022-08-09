import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { chatMenuT, serveMessageT } from "../../types";

export const chatApi = createApi({
  reducerPath: "chatApi",
  tagTypes: ["chats"],
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/" }),
  endpoints: (builder) => ({
    getChats: builder.query<chatMenuT[], string>({
      query: (email) => ({
        url: `api/chats`,
        params: {
          email,
        },
      }),
      providesTags: ["chats"],
    }),
    createChat: builder.mutation<
      serveMessageT,
      { email1: string; email2: string }
    >({
      query: (body) => ({
        url: "/api/chat",
        method: "POST",
        body,
      }),
      invalidatesTags: ["chats"],
    }),
  }),
});

export const { useGetChatsQuery, useCreateChatMutation } = chatApi;
