"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";

export default function Home() {
  const [events, setEvents] = useState<any[]>([]); // Fixed below
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [session, setSession] = useState<Session | null>(null);

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
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase.from("events").select("*");
        if (error) throw error;
        setEvents(data || []);
      } catch (err: any) { // Fixed to specific error type if needed
        setError("Failed to load events.");
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold">Welcome to Talkaholic</h1>
      {events.length > 0 ? (
        <ul className="space-y-4">
          {events.map((event: any) => ( // Fixed below
            <li key={event.id} className="bg-white shadow-md p-4 rounded">
              <h2 className="text-xl font-semibold">{event.name}</h2>
              <p>Date: {new Date(event.date).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No events available.</p>
      )}
    </div>
  );
}