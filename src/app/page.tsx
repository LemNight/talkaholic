import Hero from "@/components/Hero";
import About from "@/components/About";
import EventPreview from "@/components/EventPreview";
import TriviaPreview from "@/components/TriviaPreview";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  return (
    <div className="container mx-auto py-8">
      <Hero />
      <About />
      <EventPreview />
      <TriviaPreview />
      <HowItWorks />
      <Testimonials />
    </div>
  );
}