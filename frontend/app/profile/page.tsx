"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Loader2,
  Save,
  Pencil,
  User as UserIcon,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();
  const { token, userName, userEmail } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (!token) {
      router.replace("/auth/login");
      return;
    }
    let isMounted = true;
    (async () => {
      try {
        const { api } = await import("@/lib/api");
        const res = await api.getProfile(token);
        if (!isMounted) return;
        if (res && res.email) {
          setName(res.name || userName || "John Doe");
          setEmail(res.email || userEmail || "john@example.com");
          setPhone(res.phone || "+1 (555) 123-4567");
          setAddress(res.address || "221B Baker Street, London");
        } else {
          setName(userName || "John Doe");
          setEmail(userEmail || "john@example.com");
          setPhone("+1 (555) 123-4567");
          setAddress("221B Baker Street, London");
        }
      } catch (e) {
        setName(userName || "John Doe");
        setEmail(userEmail || "john@example.com");
        setPhone("+1 (555) 123-4567");
        setAddress("221B Baker Street, London");
      } finally {
        if (isMounted) setLoading(false);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, [token, router, userName, userEmail]);

  const initials = useMemo(
    () => (name || email || "U").trim().charAt(0).toUpperCase(),
    [name, email]
  );

  const onSave = async () => {
    if (!token) return;
    setSaving(true);
    setMessage(null);
    try {
      const { api } = await import("@/lib/api");
      const res = await api.updateProfile(token, {
        name,
        email,
        phone,
        address,
      });
      if (res && (res.name || res.email)) {
        setMessage("Profile updated successfully");
        setEditMode(false);
      } else {
        setMessage(res?.message || "Failed to update profile");
      }
    } catch (e) {
      setMessage("Network error. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (!token) return null;

  return (
    <div className="min-h-screen pt-24 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/60 backdrop-blur shadow-xl">
          {/* Futuristic gradient background */}
          <div className="absolute -top-24 -right-24 h-64 w-64 bg-gradient-to-tr from-orange-500/30 via-fuchsia-500/30 to-cyan-500/30 blur-3xl rounded-full" />
          <div className="absolute -bottom-24 -left-24 h-64 w-64 bg-gradient-to-tr from-cyan-500/20 via-orange-500/20 to-fuchsia-500/20 blur-3xl rounded-full" />

          <div className="relative p-6 sm:p-10">
            <div className="flex items-center gap-4 sm:gap-6">
              <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-full bg-orange-600 text-white flex items-center justify-center text-2xl font-semibold shadow-md">
                {initials}
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-semibold">
                  {name || "John Doe"}
                </h1>
                <p className="text-sm text-muted-foreground">
                  {email || "john@example.com"}
                </p>
              </div>
              <div className="ml-auto flex items-center gap-2">
                <Button variant="ghost" onClick={() => setEditMode((v) => !v)}>
                  <Pencil className="h-4 w-4 mr-2" />
                  {editMode ? "Cancel" : "Edit"}
                </Button>
                <Button onClick={onSave} disabled={!editMode || saving}>
                  {saving ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Save className="h-4 w-4 mr-2" />
                  )}
                  Save
                </Button>
              </div>
            </div>

            {message && (
              <p className="mt-2 text-sm {message.includes('successfully') ? 'text-green-600' : 'text-red-600'}">
                {message}
              </p>
            )}

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <Label className="mb-1 flex items-center gap-2">
                  <UserIcon className="h-4 w-4" /> Full Name
                </Label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={!editMode}
                  placeholder="John Doe"
                />
              </div>
              <div>
                <Label className="mb-1 flex items-center gap-2">
                  <Mail className="h-4 w-4" /> Email
                </Label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={!editMode}
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <Label className="mb-1 flex items-center gap-2">
                  <Phone className="h-4 w-4" /> Phone
                </Label>
                <Input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  disabled={!editMode}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              <div>
                <Label className="mb-1 flex items-center gap-2">
                  <MapPin className="h-4 w-4" /> Address
                </Label>
                <Input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  disabled={!editMode}
                  placeholder="221B Baker Street, London"
                />
              </div>
            </div>

            {/* Additional sections: orders summary, preferences (placeholders) */}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-4 bg-white/60 dark:bg-gray-900/60">
                <p className="text-sm text-muted-foreground">Orders</p>
                <p className="text-2xl font-semibold">12</p>
              </div>
              <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-4 bg-white/60 dark:bg-gray-900/60">
                <p className="text-sm text-muted-foreground">Wishlist</p>
                <p className="text-2xl font-semibold">5</p>
              </div>
              <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-4 bg-white/60 dark:bg-gray-900/60">
                <p className="text-sm text-muted-foreground">Reviews</p>
                <p className="text-2xl font-semibold">3</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
