"use client";

import { useEffect, useState } from "react";
import Hero from "@/components/Hero";
import About from "@/components/About";
import EventPreview from "@/components/EventPreview";
import TriviaPreview from "@/components/TriviaPreview";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import { supabase } from "@/lib/supabase";

export default function Home() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase.from("events").select("*");
      if (error) {
        console.error("Error fetching events:", error.message);
      } else {
        setEvents(data || []);
      }
      setLoading(false);
    };
    fetchEvents();
  }, []);

  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      <section>
        <Hero />
      </section>

      <section>
        <About />
      </section>

      <section>
        {loading ? (
          <p className="text-center text-gray-600">Loading events...</p>
        ) : (
          <EventPreview events={events} />
        )}
      </section>

      <section>
        <TriviaPreview />
      </section>

      <section>
        <HowItWorks />
      </section>

      <section>
        <Testimonials />
      </section>
    </main>
  );
}