import Link from "next/link";

export default function EventPreview() {
  const events = [{ name: "Tech Night" }, { name: "Music Quiz" }, { name: "General Bash" }];
  return (
    <section className="py-8 text-center">
      <h2 className="text-2xl font-bold">Ongoing Events</h2>
      <div className="mt-4">
        {events.map((event, index) => (
          <div key={index} className="my-2">{event.name}</div>
        ))}
      </div>
      <Link href="/events" className="text-blue-600">See All</Link>
    </section>
  );
}