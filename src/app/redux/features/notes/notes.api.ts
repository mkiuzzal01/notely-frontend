import { baseApi } from "../../API/base.api";

export const notesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createNote: builder.mutation({
      query: (payload) => ({
        url: "/note/create",
        method: "POST",
        body: payload,
      }),
    }),
    updateNote: builder.mutation({
      query: ({ id, payload }) => ({
        url: `/note/update/${id}`,
        method: "PATCH",
        body: payload,
      }),
    }),
    deleteNote: builder.mutation({
      query: (id) => ({
        url: `/note/delete/${id}`,
        method: "DELETE",
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateNoteMutation,
  useUpdateNoteMutation,
  useDeleteNoteMutation,
} = notesApi;

export default notesApi;