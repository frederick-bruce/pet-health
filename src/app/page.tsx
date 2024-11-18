import Hero from "@/components/Hero";
import Features from "@/components/Features";
import CTA from "@/components/CTA";
import LandingLayout from "@/components/layouts/LandingLayout";
import Testimonials from "@/components/Testimonials";
import { FEATURES, TESTIMONIALS } from "@/lib/constants";

export default function Home() {
  return (
    <LandingLayout>
      <Hero />
      <Features features={FEATURES} />
      <Testimonials testimonials={TESTIMONIALS} />
      <CTA />
    </LandingLayout>
  );
}
