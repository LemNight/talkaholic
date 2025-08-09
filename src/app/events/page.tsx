"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";

interface Event {
  id: string;
  name: string;
  description: string;
  date: string;
  creator_id: string;
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
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
      <h1 className="text-2xl font-bold">Events</h1>
      {events.length > 0 ? (
        <ul className="space-y-4">
          {events.map((event) => (
            <li key={event.id} className="bg-white shadow-md p-4 rounded">
              <h2 className="text-xl font-semibold">{event.name}</h2>
              <p>Date: {new Date(event.date).toLocaleDateString()}</p>
              <p>{event.description}</p>
              <a href={`/events/${event.id}`} className="text-blue-600 hover:underline">View Details</a>
            </li>
          ))}
        </ul>
      ) : (
        <p>No events available.</p>
      )}
    </div>
  );
}