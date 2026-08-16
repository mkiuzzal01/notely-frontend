/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createApi,
  fetchBaseQuery,
  type DefinitionType,
  type BaseQueryApi,
  type BaseQueryFn,
  type FetchArgs,
} from "@reduxjs/toolkit/query/react";
import { logout, setUser, TUser } from "../features/auth/auth.slice";
import { RootState } from "../store";
import { tagTypes } from "./tagType";

//this is the  base query:
const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      const value = String(token).startsWith("Bearer ") ? String(token) : `Bearer ${token}`;
      headers.set("Authorization", value);
    }
    return headers;
  },
});

//generate refresh token it's expired:
const baseQueryWithRefreshToken: BaseQueryFn<
  FetchArgs,
  BaseQueryApi,
  DefinitionType
> = async (args, api, extraOptions): Promise<any> => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 404) {
    console.log(result.error);
  }
  if (result?.error?.status === 403) {
    console.log(result.error);
  }
  if (result?.error?.status === 401) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh-token`, {
      method: "POST",
      credentials: "include",
    });

    const { data } = await res.json();
    const user = (api.getState() as RootState).auth.user as TUser;

    if (data?.result?.accessToken && user) {
      api.dispatch(
        setUser({
          user,
          token: data.result.accessToken,
        })
      );

      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: tagTypes,
  endpoints: () => ({}),
});