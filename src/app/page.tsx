/* eslint-disable */
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      {/* Navbar */}
      <nav className="bg-black text-white py-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-xl font-bold">Talkaholic</Link>
          <div className="space-x-4">
            <Link href="/events" className="hover:underline">Events</Link>
            <Link href="/login" className="hover:underline">Login</Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto py-8">
        {/* About Us */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-blue-600 text-left">About Us</h2>
          <p className="text-gray-700">
            Talkaholic is where curiosity meets connection. Join our vibrant community to explore events, answer trivia, and engage meaningfully.
          </p>
        </section>

        {/* Featured Trivia */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-blue-600 text-left">Featured Trivia</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded shadow">
              <h3 className="text-xl font-medium text-left">Tech Quiz</h3>
            </div>
            <div className="bg-white p-4 rounded shadow">
              <h3 className="text-xl font-medium text-left">Music Trivia</h3>
            </div>
            <div className="bg-white p-4 rounded shadow">
              <h3 className="text-xl font-medium text-left">General Knowledge</h3>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-blue-600 text-left">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded shadow text-center">
              <h3 className="text-xl font-medium text-left">Join</h3>
              <p className="text-gray-700">Sign up and become part of the Talkaholic community.</p>
            </div>
            <div className="bg-white p-4 rounded shadow text-center">
              <h3 className="text-xl font-medium text-left">Play</h3>
              <p className="text-gray-700">Participate in trivia and engaging events.</p>
            </div>
            <div className="bg-white p-4 rounded shadow text-center">
              <h3 className="text-xl font-medium text-left">Play</h3>
              <p className="text-gray-700">Win rewards and build your social presence.</p>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-blue-600 text-left">What People Are Saying</h2>
          <p className="text-gray-700">Testimonials coming soon. Stay tuned!</p>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-black text-white py-4 text-center">
        <p>&copy; 2025 Talkaholic. All rights reserved.</p>
      </footer>
    </div>
  );
}