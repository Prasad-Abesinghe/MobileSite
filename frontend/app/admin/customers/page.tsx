"use client";

import React from "react";
import { useAuth, useIsAdmin } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { Search, Users, Plus, Trash2, Loader2 } from "lucide-react";

export default function CustomersPage() {
  const { token } = useAuth();
  const isAdmin = useIsAdmin();
  const router = useRouter();
  const [search, setSearch] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const [users, setUsers] = React.useState<
    Array<{
      _id: string;
      name: string;
      email: string;
      role: string;
      createdAt?: string;
    }>
  >([]);

  const [isAddOpen, setIsAddOpen] = React.useState(false);
  const [creating, setCreating] = React.useState(false);
  const [newName, setNewName] = React.useState("");
  const [newEmail, setNewEmail] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [newRole, setNewRole] = React.useState<"user" | "admin">("user");
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!isAdmin) {
      router.replace("/");
      return;
    }
    let mounted = true;
    (async () => {
      try {
        const { api } = await import("@/lib/api");
        const res = await api.listUsers(token as string);
        if (!mounted) return;
        setUsers(Array.isArray(res) ? res : []);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [isAdmin, token, router]);

  const filtered = React.useMemo(() => {
    if (!search.trim()) return users;
    const q = search.toLowerCase();
    return users.filter(
      (u) =>
        u.name?.toLowerCase().includes(q) || u.email?.toLowerCase().includes(q)
    );
  }, [users, search]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!newName.trim() || !newEmail.trim() || newPassword.length < 6) {
      setError("Please provide name, valid email and password (min 6 chars)");
      return;
    }
    setCreating(true);
    try {
      const { api } = await import("@/lib/api");
      const res = await api.createUser(token as string, {
        name: newName.trim(),
        email: newEmail.trim(),
        password: newPassword,
        role: newRole,
      });
      if (res && res._id) {
        setUsers((prev) => [
          {
            _id: res._id,
            name: res.name,
            email: res.email,
            role: res.role,
            createdAt: res.createdAt,
          },
          ...prev,
        ]);
        setIsAddOpen(false);
        setNewName("");
        setNewEmail("");
        setNewPassword("");
        setNewRole("user");
      } else {
        setError(res?.message || "Failed to create user");
      }
    } catch (e) {
      setError("Network error. Please try again.");
    } finally {
      setCreating(false);
    }
  };

  const handleDelete = async (id: string) => {
    const confirm = window.confirm("Delete this user?");
    if (!confirm) return;
    const prev = users;
    setUsers((u) => u.filter((x) => x._id !== id));
    try {
      const { api } = await import("@/lib/api");
      const res = await api.deleteUser(token as string, id);
      if (!res || res.message !== "User deleted") {
        // revert
        setUsers(prev);
        alert(res?.message || "Failed to delete user");
      }
    } catch (e) {
      setUsers(prev);
      alert("Network error. Could not delete.");
    }
  };

  if (!isAdmin) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Customers
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Manage your platform users
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-2">
            <Users className="w-4 h-4" /> {users.length} users
          </div>
          <button
            className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white text-sm px-3 py-2 rounded-lg"
            onClick={() => setIsAddOpen(true)}
          >
            <Plus className="w-4 h-4" /> Add User
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search by name or email..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:text-white"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b dark:border-gray-700">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Joined
              </th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {(loading ? Array.from({ length: 6 }) : filtered).map((u, idx) => (
              <tr
                key={(u as any)?._id ?? idx}
                className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                  {loading ? (
                    <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
                  ) : (
                    (u as any).name
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {loading ? (
                    <div className="h-4 w-40 bg-gray-200 dark:bg-gray-700 rounded" />
                  ) : (
                    (u as any).email
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {loading ? (
                    <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded" />
                  ) : (
                    (u as any).role
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {loading ? (
                    <div className="h-4 w-28 bg-gray-200 dark:bg-gray-700 rounded" />
                  ) : (u as any).createdAt ? (
                    new Date((u as any).createdAt).toLocaleDateString()
                  ) : (
                    "-"
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                  {!loading && (u as any)?._id && (
                    <button
                      className="inline-flex items-center gap-1 text-red-600 hover:text-red-700"
                      onClick={() => handleDelete((u as any)._id)}
                    >
                      <Trash2 className="w-4 h-4" /> Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isAddOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => !creating && setIsAddOpen(false)}
        >
          <div
            className="w-full max-w-md bg-white dark:bg-gray-900 rounded-lg p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-semibold mb-4">Add New User</h2>
            {error && <p className="text-sm text-red-600 mb-2">{error}</p>}
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-sm mb-1">Full Name</label>
                <input
                  className="w-full px-3 py-2 rounded border dark:bg-gray-800"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Email</label>
                <input
                  type="email"
                  className="w-full px-3 py-2 rounded border dark:bg-gray-800"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Password</label>
                <input
                  type="password"
                  className="w-full px-3 py-2 rounded border dark:bg-gray-800"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Role</label>
                <select
                  className="w-full px-3 py-2 rounded border dark:bg-gray-800"
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value as any)}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  className="px-3 py-2 rounded border"
                  disabled={creating}
                  onClick={() => setIsAddOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-3 py-2 rounded"
                  disabled={creating}
                >
                  {creating ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : null}
                  {creating ? "Creating..." : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
