export class HttpError extends Error {
  constructor(
    public status: number,
    message: string,
    public data: unknown,
  ) {
    super(message || `HTTP ${status}`);
    this.name = "HttpError";
  }
}

export type FetchOptions = Omit<RequestInit, "body" | "method"> & {
  method?: "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
  body?: Record<string, unknown> | Array<unknown> | string | null;
  revalidate?: number | false;
  tags?: string[];
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

export async function apiFetch<T>(
  endpoint: string,
  options: FetchOptions = {},
): Promise<T> {
  const {
    method = "GET",
    body,
    headers,
    cache,
    revalidate,
    tags,
    ...restOptions
  } = options;

  const isGet = method === "GET";

  const sanitizedEndpoint = endpoint.startsWith("/")
    ? endpoint
    : `/${endpoint}`;
  const targetUrl = `${API_BASE_URL.replace(/\/$/, "")}${sanitizedEndpoint}`;

  const requestHeaders = new Headers(headers);
  if (body && !(body instanceof FormData) && !requestHeaders.has("Content-Type")) {
    requestHeaders.set("Content-Type", "application/json");
  }

  const fetchConfig: RequestInit & {
    next?: { revalidate?: number | false; tags?: string[] };
  } = {
    ...restOptions,
    method,
    headers: requestHeaders,
    body:
      body && typeof body !== "string" && !(body instanceof FormData)
        ? JSON.stringify(body)
        : (body as BodyInit | null | undefined),
  };

  if (cache !== undefined) {
    fetchConfig.cache = cache;
  } else if (!isGet) {
    fetchConfig.cache = "no-store";
  } else if (revalidate === undefined) {
    fetchConfig.cache = "force-cache";
  }

  if (isGet && (revalidate !== undefined || tags !== undefined)) {
    fetchConfig.next = { revalidate, tags };
  }

  const response = await fetch(targetUrl, fetchConfig);

  if (response.status === 204) {
    return {} as T;
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new HttpError(response.status, response.statusText, errorData);
  }

  return response.json() as Promise<T>;
}