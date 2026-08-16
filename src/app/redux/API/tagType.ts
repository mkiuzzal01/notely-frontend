export const tagTypes = ["User", "Notes", "Users", "Posts"] as const;

export type TagType = (typeof tagTypes)[number];

