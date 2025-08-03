"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

interface Event {
  id: string;
  name: string;
  description: string;
  date: string;
  creator_id: string;
}

export default function Events() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data, error } = await supabase.from("events").select("*");
        if (error) throw error;
        setEvents(data || []);
      } catch (err: any) {
        console.error("Error fetching events:", err.message);
        setError("Unable to load events. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const renderEventItem = (event: Event) => (
    <li
      key={event.id}
      className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition duration-300"
    >
      <h2 className="text-xl font-semibold text-gray-900">{event.name}</h2>
      <p className="text-gray-600 mt-2">
        Date: {new Date(event.date).toLocaleDateString()}
      </p>
      <p className="text-gray-500 mt-1">{event.description}</p>
      <Link
        href={`/events/${event.id}`}
        className="mt-2 inline-block text-blue-600 hover:text-blue-800 font-medium"
      >
        View Details
      </Link>
    </li>
  );

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-6 text-center">All Events</h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading events...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : events.length > 0 ? (
        <ul className="space-y-4">{events.map(renderEventItem)}</ul>
      ) : (
        <p className="text-center text-gray-600">No events available at the moment.</p>
      )}

      <div className="mt-6 text-center">
        <Link href="/" className="text-blue-600 hover:text-blue-800 font-medium">
          Back to Home
        </Link>
      </div>
    </div>
  );
}