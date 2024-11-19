"use client";
import Link from "next/link";
import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export default function Header() {
  const { isSignedIn, user } = useUser();

  return (
    <header className="bg-primary text-primary-foreground p-4">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
        <Link href="/" className="text-2xl font-bold mb-4 sm:mb-0">
          Dog Health Tracker
        </Link>
        <nav className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
          {isSignedIn ? (
            <>
              <ul className="flex space-x-4">
                <li>
                  <Link href="/dashboard" className="hover:underline">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="/health-logs" className="hover:underline">
                    Health Logs
                  </Link>
                </li>
              </ul>
              <UserButton afterSignOutUrl="/" />
            </>
          ) : (
            <>
              <SignInButton mode="redirect">
                <Button variant="secondary" size="sm">
                  Sign In
                </Button>
              </SignInButton>
              <SignUpButton mode="redirect">
                <Button variant="outline" size="sm">
                  Sign Up
                </Button>
              </SignUpButton>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
