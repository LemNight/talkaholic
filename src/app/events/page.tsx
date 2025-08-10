/* eslint-disable */
"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

// Define the event interface
interface Event {
  id: number;
  title: string;
  description: string;
  date: string; // Assuming date is stored as a string (e.g., ISO format)
}

export default function Events() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      const { data, error } = await supabase.from("events").select("*");
      if (error) setError(error.message);
      else setEvents(data || []);
      setLoading(false);
    };
    fetchEvents();
  }, []);

  const handleRSVP = async (eventId: number) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setError("Please log in to RSVP.");
      return;
    }
    const { error } = await supabase.from("rsvps").insert({
      event_id: eventId,
      user_id: user.id,
    });
    if (error) setError(error.message);
    else setError("RSVP successful!");
  };

  if (loading) return <div className="container mx-auto py-10 text-center text-gray-600">Loading events...</div>;
  if (error) return <div className="container mx-auto py-10 text-center text-red-500">{error}</div>;

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">Events</h1>
      {events.length === 0 ? (
        <p className="text-gray-700">No events available. Check back later!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {events.map((event: Event) => (
            <div key={event.id} className="bg-white p-4 rounded shadow">
              <h2 className="text-xl font-medium">{event.title}</h2>
              <p className="text-gray-700">{event.description}</p>
              <p className="text-gray-500">Date: {new Date(event.date).toLocaleDateString()}</p>
              <button
                onClick={() => handleRSVP(event.id)}
                className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                RSVP
              </button>
            </div>
          ))}
        </div>
      )}
      <div className="mt-4">
        <Link href="/" className="text-blue-600 hover:underline">Back to Home</Link>
      </div>
    </div>
  );
}