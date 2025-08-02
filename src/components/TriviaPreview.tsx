import Link from "next/link";

export default function TriviaPreview() {
  const trivia = [{ name: "Tech Quiz" }, { name: "Music Trivia" }, { name: "General Knowledge" }];
  return (
    <section className="py-8 text-center">
      <h2 className="text-2xl font-bold">Ongoing Trivia</h2>
      <div className="mt-4">
        {trivia.map((item, index) => (
          <div key={index} className="my-2">{item.name}</div>
        ))}
      </div>
      <Link href="/trivia" className="text-blue-600">See All</Link>
    </section>
  );
}