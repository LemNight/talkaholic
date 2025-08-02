import Hero from "@/components/Hero";
import About from "@/components/About";
import EventPreview from "@/components/EventPreview";
import TriviaPreview from "@/components/TriviaPreview";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      <section>
        <Hero />
      </section>

      <section>
        <About />
      </section>

      <section>
        <EventPreview />
      </section>

      <section>
        <TriviaPreview />
      </section>

      <section>
        <HowItWorks />
      </section>

      <section>
        <Testimonials />
      </section>
    </main>
  );
}
