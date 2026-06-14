/* eslint-disable @typescript-eslint/no-explicit-any */
// app/admin/users/page.tsx

import DeleteButton from "./exampleClientFetch";
import { serverFetch } from "./serverFetch";

export default async function AdminUsersPage() {

  const { data: users, error } = await serverFetch("/api/admin/users");

  if (error) return <div>Error: {JSON.stringify(error)}</div>;

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-5">User List (Admin)</h1>
      <table className="min-w-full border">
        <thead>
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user: any) => (
            <tr key={user.id}>
              <td className="border p-2">{user.name}</td>
              <td className="border p-2">{user.email}</td>
              <td className="border p-2">
                {/* 2. Delete Button */}
                <DeleteButton userId={user.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}