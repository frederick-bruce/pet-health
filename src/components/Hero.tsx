import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Hero() {
  return (
    <section className="py-20 bg-gradient-to-r from-primary to-primary-foreground text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-6">Keep Your Furry Friend Happy and Healthy</h1>
          <p className="text-xl mb-8">Track your dog&apos;s health, set reminders, and get insights with our easy-to-use app.</p>
          <Button asChild size="lg">
            <Link href="/sign-up">Get Started for Free</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}