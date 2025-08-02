export default function Hero() {
  return (
    <section className="text-center py-16 bg-gradient-to-b from-white to-blue-50">
      <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
        Welcome to <span className="text-blue-600">Talkaholic</span>
      </h1>
      <p className="mt-4 text-lg text-gray-700 max-w-xl mx-auto">
        Discover fun events, test your knowledge with trivia, and connect with a community that loves to talk!
      </p>
      <div className="mt-6">
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition">
          Join the Fun
        </button>
      </div>
    </section>
  );
}
