import { ReactNode, useState } from "react";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Home, Calendar, FileText, Settings, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MobileLayoutProps {
  children: ReactNode;
}

export default function MobileLayout({ children }: MobileLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <Button variant="ghost" size="icon" onClick={toggleSidebar}>
            <Menu className="h-6 w-6" />
          </Button>
          <h1 className="text-xl font-bold text-primary">Dog Health Tracker</h1>
          <UserButton afterSignOutUrl="/" />
        </div>
      </header>

      {/* Sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-50"
          onClick={toggleSidebar}
        >
          <aside className="w-64 h-full bg-white shadow-md transform transition-transform duration-300 ease-in-out">
            <div className="p-4 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-primary">Menu</h2>
              <Button variant="ghost" size="icon" onClick={toggleSidebar}>
                <X className="h-6 w-6" />
              </Button>
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
        </div>
      )}

      {/* Main content */}
      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </div>
      </main>
    </div>
  );
}
