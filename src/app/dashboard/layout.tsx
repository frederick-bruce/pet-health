import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-background">
      <div className="flex-1 overflow-auto">
        <main className="lg:pl-[80px] transition-all duration-300 ease-in-out">
          {children}
        </main>
      </div>
    </div>
  );
}
