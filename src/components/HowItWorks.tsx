export default function HowItWorks() {
  const steps = [
    { title: "Join", description: "Sign up and become part of the Talkaholic community." },
    { title: "Play", description: "Participate in trivia and engaging events." },
    { title: "Earn", description: "Win rewards and build your social presence." },
  ];

  return (
    <section className="py-12 bg-gray-50 text-center">
      <h2 className="text-3xl font-bold text-gray-800">How It Works</h2>
      <div className="mt-8 flex flex-col md:flex-row justify-center items-stretch gap-6 px-4">
        {steps.map((step, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-6 w-full md:w-1/3 border border-gray-200"
          >
            <div className="text-blue-600 text-2xl font-semibold mb-2">{step.title}</div>
            <p className="text-gray-600">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
