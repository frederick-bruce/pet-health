import { ReactNode } from "react";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Home, Calendar, FileText, Settings } from "lucide-react";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-primary">
            Dog Health Tracker
          </h1>
        </div>
        <nav className="mt-6">
          <Link
            href="/dashboard"
            className="block px-4 py-2 text-gray-600 hover:bg-primary hover:text-white"
          >
            <Home className="inline-block w-5 h-5 mr-2" />
            Dashboard
          </Link>
          <Link
            href="/dashboard/calendar"
            className="block px-4 py-2 text-gray-600 hover:bg-primary hover:text-white"
          >
            <Calendar className="inline-block w-5 h-5 mr-2" />
            Calendar
          </Link>
          <Link
            href="/dashboard/health-logs"
            className="block px-4 py-2 text-gray-600 hover:bg-primary hover:text-white"
          >
            <FileText className="inline-block w-5 h-5 mr-2" />
            Health Logs
          </Link>
          <Link
            href="/dashboard/settings"
            className="block px-4 py-2 text-gray-600 hover:bg-primary hover:text-white"
          >
            <Settings className="inline-block w-5 h-5 mr-2" />
            Settings
          </Link>
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
              Dashboard
            </h2>
            <UserButton afterSignOutUrl="/" />
          </div>
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
