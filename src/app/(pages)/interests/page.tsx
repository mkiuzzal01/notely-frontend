"use client";

import { useGetUserInterestsQuery } from "@/app/redux/features/users/users.api";

export default function InterestsPage() {
  const { data, isLoading } = useGetUserInterestsQuery();

  return (
    <div className="p-4">
      <h1 className="mb-4 text-xl font-semibold">Interests (Grouped)</h1>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data?.groups?.map((g: any) => (
            <div key={g._id} className="rounded-lg border p-3">
              <div className="mb-2 font-medium">{g.interest}</div>
              <div className="text-sm text-gray-600">{g.users?.length || 0} users</div>
              <ul className="mt-2 text-sm">
                {g.users?.map((u: any) => (
                  <li key={u._id} className="py-1">
                    {u.name} — {u.email}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
