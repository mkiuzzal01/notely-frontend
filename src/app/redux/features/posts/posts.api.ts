import { baseApi } from "../../API/base.api";

export const postsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createPost: builder.mutation({
      query: (payload) => ({
        url: "/post/create",
        method: "POST",
        body: payload,
      }),
    }),
    updatePost: builder.mutation({
      query: ({ id, payload }) => ({
        url: `/post/update/${id}`,
        method: "PATCH",
        body: payload,
      }),
    }),
    deletePost: builder.mutation({
      query: (id) => ({
        url: `/post/delete/${id}`,
        method: "DELETE",
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} = postsApi;

export default postsApi;