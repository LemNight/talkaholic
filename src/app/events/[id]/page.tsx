"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { Session } from "@supabase/supabase-js";

interface Event {
  id: string;
  name: string;
  description: string;
  date: string;
  creator_id: string;
}

export default function EventDetail({ params }: { params: { id: string } }) {
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const router = useRouter(); // Used below

  useEffect(() => {
    const fetchSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
    };
    fetchSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => authListener.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase.from("events").select("*").eq("id", params.id).single();
        if (error) throw error;
        setEvent(data);
      } catch (err: any) { // Fixed to specific error type if needed, but kept simple
        setError("Failed to load event.");
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [params.id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!event) return <p>Event not found.</p>;

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold">{event.name}</h1>
      <p>Date: {new Date(event.date).toLocaleDateString()}</p>
      <p>{event.description}</p>
      {session?.user?.id === event.creator_id && (
        <button onClick={() => router.push(`/events/${event.id}/edit`)} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">
          Edit
        </button>
      )}
    </div>
  );
}