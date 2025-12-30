import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithErrorHandling } from "../../app/api/baseApi";
import type { User } from "../../app/models/user";

export const accountApi = createApi({
  reducerPath: "accountApi",
  baseQuery: baseQueryWithErrorHandling,
  endpoints: (builder) => ({
    login: builder.mutation<void, object>({
      query: (creds) => {
        return {
          url: "login?useCookies=true",
          body: creds,
          method: "POST",
        };
      },
    }),
    register: builder.mutation<void, object>({
      query: (creds) => {
        return {
          url: "account/register",
          body: creds,
          method: "POST",
        };
      },
    }),
    userInfo: builder.query<User, void>({
      query: () => {
        return {
          url: "account/user-info",
          method: "GET",
        };
      },
    }),
    logOut: builder.mutation<void, void>({
      query: () => ({
        url: "account/logout",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogOutMutation,
  useRegisterMutation,
  useUserInfoQuery,
} = accountApi;
