// actions/users.ts
"use server";

import { serverFetch } from "@/lib/fetch/serverFetch";
import { revalidatePath } from "next/cache";

interface User {
    id: string;
    name: string;
    email: string;
    role: "admin" | "user";
}


export async function getUsers() {
    const { data, error } = await serverFetch<User[]>("/api/admin/users");

    if (error) {
        return { users: [], error: error.message };
    }

    return { users: data || [], error: null };
}

export async function getUserById(userId: string) {
    const { data, error } = await serverFetch<User>(`/api/admin/users/${userId}`);

    if (error) {
        return { user: null, error: error.message };
    }

    return { user: data, error: null };
}


export async function createUser(formData: FormData) {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const role = formData.get("role") as string;

    const { data, error } = await serverFetch<User>("/api/admin/users", {
        method: "POST",
        body: JSON.stringify({ name, email, password, role }),
    });

    if (error) {
        return { success: false, message: error.message || "Failed to create user" };
    }

    revalidatePath("/admin/users");
    return { success: true, message: "User created successfully", user: data };
}


export async function updateUser(userId: string, formData: FormData) {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const role = formData.get("role") as string;

    const { data, error } = await serverFetch<User>(
        `/api/admin/users/${userId}`,
        {
            method: "PUT",
            body: JSON.stringify({ name, email, role }),
        },
    );

    if (error) {
        return {
            success: false,
            message: error.message || "Failed to update user",
        };
    }

    revalidatePath("/admin/users");
    return { success: true, message: "User updated successfully", user: data };
}


export async function deleteUser(userId: string) {
    const { error } = await serverFetch(`/api/admin/users/${userId}`, {
        method: "DELETE",
    });

    if (error) {
        return {
            success: false,
            message: error.message || "Failed to delete user",
        };
    }

    revalidatePath("/admin/users");
    return { success: true, message: "User deleted successfully" };
}