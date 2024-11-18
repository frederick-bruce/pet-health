import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CTA() {
  return (
    <section className="py-12 md:py-20 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Ready to Start Tracking Your Dog&apos;s Health?
        </h2>
        <p className="text-lg md:text-xl mb-8">
          Join thousands of happy dog owners using our app.
        </p>
        <Button
          asChild
          size="lg"
          variant="secondary"
          className="w-full sm:w-auto"
        >
          <Link href="/sign-up">Sign Up Now</Link>
        </Button>
      </div>
    </section>
  );
}
