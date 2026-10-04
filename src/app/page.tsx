import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Categories } from "@/components/Categories";
import { WhyParticipate } from "@/components/WhyParticipate";
import { SurveyCTA, Footer } from "@/components/Sections";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Categories />
        <WhyParticipate />
        <SurveyCTA />
      </main>
      <Footer />
    </>
  );
}
