/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "../TApi";

export const getAllPosts = ({query}: {query: any}) =>
  api.get<any>(`/posts?${new URLSearchParams(query).toString()}`, {
    tags: ["post"],
    revalidate: 0,
  });
