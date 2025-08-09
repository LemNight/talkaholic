"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Session } from "@supabase/supabase-js";

interface Event {
  id: string;
  name: string;
  description: string;
  date: string;
  creator_id: string;
}

export default function AdminEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const router = useRouter();

  // Fetch session
  useEffect(() => {
    const initAuth = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
    };

    initAuth();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => authListener.subscription.unsubscribe();
  }, []);

  const isAdmin = session?.user?.user_metadata?.username === "admin";

  // Redirect non-admins
  useEffect(() => {
    if (session && !isAdmin) {
      router.push("/login");
    }
  }, [session, isAdmin, router]);

  // Fetch events
  const fetchEvents = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from("events").select("*");
      if (error) throw error;
      setEvents(data || []);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error("Fetch error:", err.message);
      setError("Failed to load events. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (session && isAdmin) fetchEvents();
  }, [session, isAdmin, fetchEvents]);

  // Handle delete
  const handleDelete = async (id: string) => {
    const confirmDelete = confirm("Are you sure you want to delete this event?");
    if (!confirmDelete) return;

    setDeletingId(id);

    const { error } = await supabase.from("events").delete().eq("id", id);
    if (error) {
      console.error("Delete error:", error.message);
      setError("Failed to delete event. Please try again.");
    } else {
      setEvents((prev) => prev.filter((event) => event.id !== id));
    }

    setDeletingId(null);
  };

  // UI Rendering
  if (!session || !isAdmin) {
    return (
      <div className="container mx-auto py-10 text-center text-gray-600">
        Redirecting...
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container mx-auto py-10 text-center">
        <p className="text-gray-600">Loading events...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-10 text-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold mb-6">Manage Events</h1>

      <div className="mb-4">
        <Link
          href="/events/add"
          className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Add New Event
        </Link>
      </div>

      {events.length > 0 ? (
        <ul className="space-y-4">
          {events.map((event) => (
            <li
              key={event.id}
              className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center transition duration-300 hover:shadow-lg"
            >
              <div>
                <h2 className="text-xl font-semibold text-gray-900">{event.name}</h2>
                <p className="text-gray-600 mt-1">Date: {new Date(event.date).toLocaleDateString()}</p>
                <p className="text-gray-500 mt-1">{event.description}</p>
              </div>
              <button
                onClick={() => handleDelete(event.id)}
                disabled={deletingId === event.id}
                className={`ml-4 px-3 py-1 rounded text-white transition ${
                  deletingId === event.id ? "bg-gray-500" : "bg-red-600 hover:bg-red-700"
                }`}
              >
                {deletingId === event.id ? "Deleting..." : "Delete"}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-600">No events to manage.</p>
      )}
    </div>
  );
}
