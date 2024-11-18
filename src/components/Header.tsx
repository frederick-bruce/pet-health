import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-primary text-primary-foreground p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          Dog Health Tracker
        </Link>
        <nav>
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
        </nav>
      </div>
    </header>
  );
}
