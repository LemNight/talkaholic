"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";

export default function AdminDashboard() {
  const [session, setSession] = useState<Session | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
    };

    fetchSession();

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const isAdmin = session?.user?.user_metadata?.username === "admin";

  if (!session || !isAdmin) {
    router.replace("/login");
    return (
      <div className="container mx-auto py-10 text-center text-gray-600">
        Redirecting...
      </div>
    );
  }

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace("/login");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 fixed md:static inset-y-0 left-0 w-64 bg-white shadow-md transition-transform duration-300 z-50`}
      >
        <div className="p-4">
          <h2 className="text-xl font-bold mb-6">Admin Menu</h2>
          <nav className="space-y-2">
            <Link href="/admin/events" className="block p-2 hover:bg-gray-200 rounded">Manage Events</Link>
            <Link href="/events/add" className="block p-2 hover:bg-gray-200 rounded">Add Event</Link>
            <button
              onClick={handleLogout}
              className="w-full text-left p-2 hover:bg-gray-200 rounded text-red-600"
            >
              Logout
            </button>
          </nav>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto">
        <button
          className="md:hidden mb-4 px-4 py-2 bg-blue-600 text-white rounded"
          onClick={() => setIsMenuOpen(prev => !prev)}
        >
          {isMenuOpen ? "Close Menu" : "Open Menu"}
        </button>

        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
        <p className="text-gray-700">Welcome, Admin! Manage your events here.</p>
      </main>
    </div>
  );
}