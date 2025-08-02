"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { User } from "@supabase/supabase-js";

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) router.push("/login");
      else setUser(user);
      setLoading(false);
    };
    getUser();
  }, [router]);

  if (loading) return <div className="container mx-auto py-10">Loading...</div>;

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      {user ? (
        <div>
          <p>Name: {user.user_metadata?.name || "Not set"}</p>
          <p>Email: {user.email}</p>
        </div>
      ) : (
        <p>Please log in to view your profile.</p>
      )}
    </div>
  );
}