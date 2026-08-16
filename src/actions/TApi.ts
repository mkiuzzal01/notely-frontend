import { cookies } from "next/headers";
import { apiFetch, FetchOptions } from "./apiFetch";

async function getHeaders(customHeaders?: HeadersInit): Promise<HeadersInit> {
  const token = (await cookies()).get("token")?.value;

  const headers = new Headers(customHeaders);
  
  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  if (token && !headers.has("Authorization")) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  return headers;
}

export const api = {
  get: async <T>(
    url: string,
    options?: Omit<FetchOptions, "method">,
  ): Promise<T> => {
    const headers = await getHeaders(options?.headers);

    return apiFetch<T>(url, {
      ...options,
      method: "GET",
      headers,
    });
  },

  post: async <T>(
    url: string,
    body?: FetchOptions["body"],
    options?: Omit<FetchOptions, "method" | "body">,
  ): Promise<T> => {
    const headers = await getHeaders(options?.headers);

    return apiFetch<T>(url, {
      ...options,
      method: "POST",
      body,
      headers,
    });
  },

  patch: async <T>(
    url: string,
    body?: FetchOptions["body"],
    options?: Omit<FetchOptions, "method" | "body">,
  ): Promise<T> => {
    const headers = await getHeaders(options?.headers);

    return apiFetch<T>(url, {
      ...options,
      method: "PATCH",
      body,
      headers,
    });
  },

  put: async <T>(
    url: string,
    body?: FetchOptions["body"],
    options?: Omit<FetchOptions, "method" | "body">,
  ): Promise<T> => {
    const headers = await getHeaders(options?.headers);

    return apiFetch<T>(url, {
      ...options,
      method: "PUT",
      body,
      headers,
    });
  },

  delete: async <T>(
    url: string,
    options?: Omit<FetchOptions, "method">,
  ): Promise<T> => {
    const headers = await getHeaders(options?.headers);

    return apiFetch<T>(url, {
      ...options,
      method: "DELETE",
      headers,
    });
  },
};