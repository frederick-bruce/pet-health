"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Calendar,
  FileText,
  Settings,
  Menu,
  ChevronLeft,
  ChevronRight,
  PawPrint,
} from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Calendar", href: "/dashboard/calendar", icon: Calendar },
  { name: "Health Logs", href: "/dashboard/health-logs", icon: FileText },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const pathname = usePathname();

  return (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="fixed left-4 top-4 z-40 lg:hidden"
          >
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-full max-w-[400px]">
          <SidebarContent pathname={pathname} />
        </SheetContent>
      </Sheet>
      <aside
        className={cn(
          "fixed top-0 left-0 z-30 hidden h-screen lg:flex lg:flex-col transition-all duration-300 ease-in-out bg-card border-r",
          isOpen ? "w-[250px]" : "w-[70px]"
        )}
      >
        <SidebarContent pathname={pathname} isCollapsed={!isOpen} />
        <Button
          variant="ghost"
          size="icon"
          className="absolute bottom-4 right-2 h-6 w-6"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Collapse Sidebar" : "Expand Sidebar"}
        >
          {isOpen ? (
            <ChevronLeft className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </Button>
      </aside>
    </>
  );
}

function SidebarContent({
  pathname,
  isCollapsed,
}: {
  pathname: string;
  isCollapsed?: boolean;
}) {
  return (
    <TooltipProvider delayDuration={0}>
      <div className="flex h-full flex-col justify-between">
        <div>
          <div className="flex h-[60px] items-center justify-center border-b">
            <PawPrint className="h-8 w-8 text-primary" />
            {!isCollapsed && (
              <h1 className="ml-2 text-2xl font-bold text-primary">
                PawHealth
              </h1>
            )}
          </div>
          <ScrollArea className="flex-1 py-4">
            <nav className="grid gap-1 px-2">
              {navItems.map((item) => (
                <Tooltip key={item.href} delayDuration={0}>
                  <TooltipTrigger asChild>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent",
                        pathname === item.href
                          ? "bg-accent text-accent-foreground"
                          : "text-muted-foreground",
                        isCollapsed && "justify-center"
                      )}
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {!isCollapsed && <span>{item.name}</span>}
                    </Link>
                  </TooltipTrigger>
                  {isCollapsed && (
                    <TooltipContent side="right">{item.name}</TooltipContent>
                  )}
                </Tooltip>
              ))}
            </nav>
          </ScrollArea>
        </div>
        <div className="border-t p-4">
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <Link
                href="/dashboard/settings"
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent mb-4",
                  pathname === "/dashboard/settings"
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground",
                  isCollapsed && "justify-center"
                )}
              >
                <Settings className="h-5 w-5 flex-shrink-0" />
                {!isCollapsed && <span>Settings</span>}
              </Link>
            </TooltipTrigger>
            {isCollapsed && (
              <TooltipContent side="right">Settings</TooltipContent>
            )}
          </Tooltip>
          <div
            className={cn(
              "flex items-center gap-3 px-3",
              isCollapsed && "justify-center"
            )}
          >
            <UserButton afterSignOutUrl="/" />
            {!isCollapsed && (
              <span className="text-sm text-muted-foreground">Account</span>
            )}
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
