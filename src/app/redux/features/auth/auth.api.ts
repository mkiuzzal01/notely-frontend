import { baseApi } from "../../API/base.api";


const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        body: userInfo,
      }),
    }),
    register: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/register",
        method: "POST",
        body: userInfo,
      }),
    }),

    forgetPassword: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/forget-password",
        method: "POST",
        body: userInfo,
      }),
    }),

    resetPassword: builder.mutation({
      query: ({ data, token }) => ({
        url: `/auth/reset-password/${token}`,
        method: "POST",
        body: data,
      }),
    }),

    updateUser: builder.mutation({
      query: ({ id, data }) => ({
        url: `/user/update/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),

    getProfileBySlug: builder.query({
      query: (slug: string) => ({
        url: `/user/${slug}`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    getProfile: builder.query({
      query: (id: string) => ({
        url: `/user/${id}`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useUpdateUserMutation,
  useForgetPasswordMutation,
  useResetPasswordMutation,
  useGetProfileQuery,
  useGetProfileBySlugQuery,
} = authApi;