import Link from "next/link";

export default function EventPreview() {
  const events = [
    { name: "Tech Night" },
    { name: "Music Quiz" },
    { name: "General Bash" },
  ];

  return (
    <section className="py-12 bg-white">
      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-800">Ongoing Events</h2>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {events.map((event, index) => (
            <div
              key={index}
              className="p-4 border rounded-lg shadow-sm hover:shadow-md transition duration-300"
            >
              <p className="text-lg font-medium text-gray-700">{event.name}</p>
            </div>
          ))}
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
