"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

interface Event {
  id: string;
  name: string;
  description: string;
  date: string;
  creator_id: string;
}

export default function EventDetails() {
  const params = useParams();
  const router = useRouter();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const { data, error } = await supabase
          .from("events")
          .select("*")
          .eq("id", params?.id)
          .single();

        if (error) throw error;
        setEvent(data);
      } catch (err: any) {
        console.error("Error fetching event:", err.message);
        setError("Failed to load event details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (params?.id) {
      fetchEvent();
    }
  }, [params?.id]);

  if (loading) {
    return (
      <section className="container mx-auto py-10 text-center">
        <p className="text-gray-600 animate-pulse">Loading event details...</p>
      </section>
    );
  }

  if (error || !event) {
    return (
      <section className="container mx-auto py-10 text-center">
        <p className="text-red-500">{error || "Event not found."}</p>
        <Link href="/events" className="mt-4 inline-block text-blue-600 hover:underline">
          &larr; Back to Events
        </Link>
      </section>
    );
  }

  return (
    <section className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <header className="text-center mb-6">
        <h1 className="text-3xl font-bold">{event.name}</h1>
      </header>

      <article className="bg-white shadow-md rounded-lg p-6 max-w-2xl mx-auto">
        <p className="text-gray-600 font-medium mb-2">
          Date:{" "}
          {event.date
            ? new Date(event.date).toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            : "Date not specified"}
        </p>
        <p className="text-gray-700 whitespace-pre-line">{event.description}</p>
      </article>

      <div className="mt-6 text-center">
        <Link href="/events" className="text-blue-600 hover:underline font-medium">
          &larr; Back to Events
        </Link>
      </div>
    </section>
  );
}