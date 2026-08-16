/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "../TApi";

export const getAllNotes = ({query}: {query: any}) =>
  api.get<any>(`/notes?${new URLSearchParams(query).toString()}`, {
    tags: ["note"],
    revalidate: 0,
  });
