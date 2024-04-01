import { apiSlice } from "./apiSlice";
import { UPLOADS_URL, USER_URL } from "../../constants/constants";
import { IUsers } from "../../interfaces/IUsers";

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
    getUsers: build.query<{ data: IUsers[] }, void>({
      query: () => ({
        url: USER_URL,
      }),
    }),
    profile: build.mutation({
      query: (data) => ({
        url: `${USER_URL}/profile`,
        method: "PATCH",
        body: data,
      }),
    }),
    updateUser: build.mutation({
      query: ({ id, data }) => ({
        url: `${USER_URL}/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    updatePassword: build.mutation({
      query: (data) => ({
        url: `${USER_URL}/updatePassword`,
        method: "PATCH",
        body: data,
      }),
    }),
    uploadUserPhoto: build.mutation({
      query: (data) => ({
        url: `${UPLOADS_URL}/users`,
        method: "POST",
        body: data,
      }),
    }),
    deleteUser: build.mutation({
      query: (id) => ({
        url: `${USER_URL}/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useGetUsersQuery,
  useProfileMutation,
  useUpdateUserMutation,
  useUpdatePasswordMutation,
  useUploadUserPhotoMutation,
  useDeleteUserMutation,
} = usersApiSlice;
