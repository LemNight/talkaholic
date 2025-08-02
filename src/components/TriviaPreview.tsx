import Link from "next/link";

export default function TriviaPreview() {
  const trivia = [
    { name: "Tech Quiz" },
    { name: "Music Trivia" },
    { name: "General Knowledge" },
  ];

  return (
    <section className="py-12 bg-white text-center">
      <h2 className="text-3xl font-bold text-gray-800">Featured Trivia</h2>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
        {trivia.map((item, index) => (
          <div
            key={index}
            className="bg-gray-100 hover:bg-gray-200 transition p-4 rounded shadow-sm text-lg font-medium"
          >
            {item.name}
          </div>
        ))}
      </div>
      <div className="mt-6">
        <Link
          href="/trivia"
          className="inline-block text-blue-600 hover:underline text-sm font-semibold"
        >
          View All Trivia →
        </Link>
      </div>
    </section>
  );
}
