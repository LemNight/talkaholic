"use client";

import Link from "next/link";

interface Event {
  id: string;
  name: string;
  description: string;
  date: string;
  creator_id: string;
}

interface EventPreviewProps {
  events: Event[];
}

export default function EventPreview({ events }: EventPreviewProps) {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-800">Ongoing Events</h2>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {events.length > 0 ? (
            events.map((event) => (
              <div
                key={event.id}
                className="p-4 border rounded-lg shadow-sm hover:shadow-md transition duration-300"
              >
                <p className="text-lg font-medium text-gray-700">{event.name}</p>
                <p className="text-sm text-gray-500 mt-1">Date: {new Date(event.date).toLocaleDateString()}</p>
                <Link
                  href={`/events/${event.id}`}
                  className="mt-2 inline-block text-blue-600 hover:text-blue-800 font-semibold"
                >
                  View Details
                </Link>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No events available at the moment.</p>
          )}
        </div>
        <div className="mt-6">
          <Link
            href="/events"
            className="inline-block text-blue-600 hover:text-blue-800 font-semibold"
          >
            See All Events →
          </Link>
        </div>
      </div>
    </section>
  );
}