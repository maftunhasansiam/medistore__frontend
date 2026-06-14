// app/admin/users/page.tsx
"use client";

import { useState, useEffect, useCallback } from "react";
import { clientFetch } from "./clientFetch";
interface User {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "USER";
}
// 1. userFetch
export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);


  const getUsers = useCallback(async () => {
    setLoading(true);
    const { data } = await clientFetch<User[]>("/api/admin/users");
    setLoading(false);
    if (data) setUsers(data);
  }, []);

 
  const createUser = async (formData: {
    name: string;
    email: string;
    password: string;
    role: string;
  }) => {
    const { data, error } = await clientFetch<User>("/api/admin/users", {
      method: "POST",
      body: JSON.stringify(formData),
    });

    if (error) {
      alert("No user created");
      return;
    }

    if (data) {
      setUsers([...users, data]); 
      alert("User created successfully!");
    }
  };


  const updateUser = async (
    userId: string,
    formData: { name: string; email: string; role: string },
  ) => {
    const { data, error } = await clientFetch<User>(
      `/api/admin/users/${userId}`,
      {
        method: "PUT",
        body: JSON.stringify(formData),
      },
    );

    if (error) {
      alert("Update failed");
      return;
    }

    if (data) {
      setUsers(users.map((u) => (u.id === userId ? data : u))); 
      alert("User updated successfully!");
    }
  };

  
  const deleteUser = async (userId: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;

    const { error } = await clientFetch(`/api/admin/users/${userId}`, {
      method: "DELETE",
    });

    if (error) {
      alert("Delete failed");
      return;
    }

    setUsers(users.filter((u) => u.id !== userId)); 
    alert("User deleted successfully!");
  };

  // Initial load
  useEffect(() => {
    const loadUsers = async () => {
      await fetchUsers();
    };

    loadUsers();
  }, []);

 
  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-5">User Management</h1>

      {/* Example: Create button */}
      <button
        onClick={() =>
          createUser({
            name: "Test User",
            email: "test@example.com",
            password: "123456",
            role: "user",
          })
        }
        className="bg-blue-600 text-white px-4 py-2 rounded mb-5"
      >
        Create New User
      </button>

      {/* Users table */}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <table className="min-w-full border">
          <thead>
            <tr>
              <th className="border p-2">Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="border p-2">{user.name}</td>
                <td className="border p-2">{user.email}</td>
                <td className="border p-2">
                  {/* Update button */}
                  <button
                    onClick={() =>
                      updateUser(user.id, {
                        name: user.name + " (Updated)",
                        email: user.email,
                        role: user.role,
                      })
                    }
                    className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                  >
                    Edit
                  </button>

                  {/* Delete button */}
                  <button
                    onClick={() => deleteUser(user.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}