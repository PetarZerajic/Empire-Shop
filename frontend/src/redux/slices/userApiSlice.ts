import { apiSlice } from "./apiSlice";
import { USER_URL } from "../../constants/constants";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    register: build.mutation({
      query: (data) => ({
        url: `${USER_URL}/register`,
        method: "POST",
        body: data,
      }),
    }),
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
    updatePassword: build.mutation({
      query: (data) => ({
        url: `${USER_URL}/updatePassword`,
        method: "PATCH",
        body: data,
      }),
    }),
    profile: build.mutation({
      query: (data) => ({
        url: `${USER_URL}/profile`,
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useProfileMutation,
  useUpdatePasswordMutation,
} = usersApiSlice;
