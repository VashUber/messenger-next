import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userT } from "../../types";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/" }),
  endpoints: (builder) => ({
    getUser: builder.query<userT, void>({
      query: () => `api/user`,
    }),
  }),
});

export const { useGetUserQuery } = userApi;
