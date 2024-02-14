import { apiSlice } from "./apiSlice";
import { USER_URL } from "../../constants/constants";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation({
      query: (data) => ({
        url: `${USER_URL}/login`,
        method: "POST",
        body: data,
      }),
    }),
    logout: build.mutation<unknown, void>({
      query: () => ({
        url: `${USER_URL}/logout`,
        method: "POST",
      }),
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation } = usersApiSlice;
