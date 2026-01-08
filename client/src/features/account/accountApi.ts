import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithErrorHandling } from "../../app/api/baseApi";
import type {
  LoginRequest,
  RegisterRequest,
  UserResponse,
} from "../../app/models/user";
import { router } from "../../app/routes/Routes";
import { toast } from "react-toastify";

export const accountApi = createApi({
  reducerPath: "accountApi",
  baseQuery: baseQueryWithErrorHandling,
  tagTypes: ["UserInfo"],
  endpoints: (builder) => ({
    login: builder.mutation<void, LoginRequest>({
      query: (creds) => {
        return {
          url: "login?useCookies=true",
          body: creds,
          method: "POST",
        };
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(accountApi.util.invalidateTags(["UserInfo"]));
        } catch (error) {
          console.log(error);
        }
      },
    }),
    register: builder.mutation<void, RegisterRequest>({
      query: (creds) => {
        return {
          url: "account/register",
          body: creds,
          method: "POST",
        };
      },
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
          router.navigate("/login");
          toast.success("Registration successful! Please log in");
        } catch (error) {
          console.log(error);
          throw error;
        }
      },
    }),
    userInfo: builder.query<UserResponse, void>({
      query: () => {
        return {
          url: "account/user-info",
          method: "GET",
        };
      },
      providesTags: ["UserInfo"],
    }),
    logOut: builder.mutation<void, void>({
      query: () => ({
        url: "account/logout",
        method: "POST",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(accountApi.util.invalidateTags(["UserInfo"]));
        router.navigate("/catalog");
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useLogOutMutation,
  useRegisterMutation,
  useUserInfoQuery,
  useLazyUserInfoQuery,
} = accountApi;
