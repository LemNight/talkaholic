export default function HowItWorks() {
  const steps = ["Join", "Play", "Earn"];
  return (
    <section className="py-8 text-center">
      <h2 className="text-2xl font-bold">How It Works</h2>
      <div className="mt-4">{steps.join(" → ")}</div>
    </section>
  );
}