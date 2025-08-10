/* eslint-disable */
export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      {/* Header */}
      <header className="bg-blue-600 text-white py-4">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl font-bold">Welcome to Talkaholic</h1>
          <p className="mt-2">Discover fun events, test your knowledge with trivia, and connect with a community that loves to talk!</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto py-8">
        {/* About Us */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-blue-600">About Us</h2>
          <p className="text-gray-700">
            Talkaholic is where curiosity meets connection. Join our vibrant community to explore events, answer trivia, and engage meaningfully.
          </p>
        </section>

        {/* Featured Trivia */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-blue-600">Featured Trivia</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded shadow">
              <h3 className="text-xl font-medium">Tech Quiz</h3>
            </div>
            <div className="bg-white p-4 rounded shadow">
              <h3 className="text-xl font-medium">Music Trivia</h3>
            </div>
            <div className="bg-white p-4 rounded shadow">
              <h3 className="text-xl font-medium">General Knowledge</h3>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-blue-600">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded shadow text-center">
              <h3 className="text-xl font-medium">Join</h3>
              <p className="text-gray-700">Sign up and become part of the Talkaholic community.</p>
            </div>
            <div className="bg-white p-4 rounded shadow text-center">
              <h3 className="text-xl font-medium">Play</h3>
              <p className="text-gray-700">Participate in trivia and engaging events.</p>
            </div>
            <div className="bg-white p-4 rounded shadow text-center">
              <h3 className="text-xl font-medium">Earn</h3>
              <p className="text-gray-700">Win rewards and build your social presence.</p>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-blue-600">What People Are Saying</h2>
          <p className="text-gray-700">Testimonials coming soon. Stay tuned!</p>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-blue-600 text-white py-4 text-center">
        <p>&copy; 2025 Talkaholic. All rights reserved.</p>
      </footer>
    </div>
  );
}