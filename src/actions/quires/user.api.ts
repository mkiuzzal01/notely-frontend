/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "../TApi";

export const getAllUsers = (query: any) =>
  api.get<any>(`/user/all?${new URLSearchParams(query).toString()}`, {
    tags: ["user"],
    revalidate: 0,
  });


export const getUserInterests = () =>
  api.get<any>(`/user/interests-group`, {
    tags: ["user"],
    revalidate: 0,
  });

