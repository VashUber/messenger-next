import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { chatMenuT, chatT, serveMessageT } from "../../types";

export const chatApi = createApi({
  reducerPath: "chatApi",
  tagTypes: ["chats", "chat"],
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

export const { useGetChatsQuery, useCreateChatMutation, useGetChatByIdQuery } =
  chatApi;
