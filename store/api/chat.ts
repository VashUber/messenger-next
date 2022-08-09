import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { chatMenuT } from "../../types";

export const chatApi = createApi({
  reducerPath: "chatApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/" }),
  endpoints: (builder) => ({
    getChats: builder.query<chatMenuT[], string>({
      query: (email) => ({
        url: `api/chats`,
        params: {
          email,
        },
      }),
    }),
  }),
});

export const { useGetChatsQuery } = chatApi;
