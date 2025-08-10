/* eslint-disable */
"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { Session } from "@supabase/supabase-js";

interface EventForm {
  name: string;
  description: string;
  date: string;
}

export default function EditEvent() {
  const params = useParams();
  const router = useRouter();
  const [formData, setFormData] = useState<EventForm>({
    name: "",
    description: "",
    date: "",
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [session, setSession] = useState<Session | null>(null);

  // Fetch session and event data
  useEffect(() => {
    const initAuth = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
    };

    const fetchEvent = async () => {
      try {
        const { data, error } = await supabase
          .from("events")
          .select("*")
          .eq("id", params?.id as string)
          .single();
        if (error) throw error;
        setFormData({
          name: data.name,
          description: data.description,
          date: data.date,
        });
      } catch (err) {
        setError("Failed to load event details.");
      } finally {
        setLoading(false);
      }
    };

    initAuth();
    if (params?.id) fetchEvent();
  }, [params?.id]);

  const isAdmin = session?.user?.user_metadata?.username === "admin";

  useEffect(() => {
    if (session && !isAdmin) {
      router.push("/login");
    }
  }, [session, isAdmin, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.name.trim() || !formData.date.trim()) {
      setError("Name and date are required.");
      return;
    }

    if (!session) {
      setError("You must be logged in.");
      return;
    }

    setSubmitting(true);

    const { error } = await supabase
      .from("events")
      .update({
        name: formData.name,
        description: formData.description,
        date: formData.date,
      })
      .eq("id", params?.id as string);

    if (error) {
      console.error("Update error:", error.message);
      setError("Failed to update event. Please try again.");
    } else {
      router.push("/admin/events");
    }

    setSubmitting(false);
  };

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
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold mb-6">Edit Event</h1>
      <div className="max-w-md mx-auto">
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-gray-700">Event Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-gray-700">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 border rounded h-24"
            />
          </div>

          <div>
            <label htmlFor="date" className="block text-gray-700">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className={`w-full px-4 py-2 rounded text-white transition ${
              submitting ? "bg-gray-500" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {submitting ? "Saving..." : "Save Changes"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <Link href="/admin/events" className="text-blue-600 hover:underline font-medium">
            Back to Manage Events
          </Link>
        </div>
      </div>
    </div>
  );
}