import React from "react";
import { ClerkProvider } from "@clerk/nextjs";
import GradientBackground from "./_components/GradientBackground";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <main className="relative min-h-screen w-full overflow-hidden">
        <GradientBackground />
        <div className="relative z-10 flex items-center justify-center min-h-screen w-full">
          {children}
        </div>
      </main>
    </ClerkProvider>
  );
}
