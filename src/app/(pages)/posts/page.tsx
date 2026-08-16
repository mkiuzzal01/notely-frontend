"use client";

import { useState } from "react";
import { useGetUsersQuery } from "@/app/redux/features/users/users.api";
import { useGetUserPostsQuery } from "@/app/redux/features/posts/posts.api";

export default function UserPostsPage() {
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const { data: users } = useGetUsersQuery({ page: 1, limit: 50 });
  const { data: postsData, isLoading } = useGetUserPostsQuery({ userId: selectedUser || "", page: 1, limit: 20 }, { skip: !selectedUser } as any);

  return (
    <div className="p-4">
      <h1 className="mb-4 text-xl font-semibold">User Posts</h1>
      <div className="mb-4 flex gap-2">
        <select
          className="rounded border px-3 py-2"
          value={selectedUser ?? ""}
          onChange={(e) => setSelectedUser(e.target.value || null)}
        >
          <option value="">Select user</option>
          {users?.data?.map((u: any) => (
            <option key={u._id} value={u._id}>
              {u.name} ({u.email})
            </option>
          ))}
        </select>
      </div>

      {selectedUser ? (
        isLoading ? (
          <div>Loading posts...</div>
        ) : (
          <div className="grid gap-3">
            {postsData?.data?.map((p: any) => (
              <div key={p._id} className="rounded-lg border p-3">
                <div className="font-medium">{p.title}</div>
                <div className="text-sm text-gray-600">{p.body}</div>
              </div>
            ))}
          </div>
        )
      ) : (
        <div className="text-sm text-gray-600">Select a user to view posts</div>
      )}
    </div>
  );
}
