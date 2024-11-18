import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface DogProfileProps {
  name: string;
  breed: string;
  age: number;
  avatarSrc: string;
}

export function DogProfile({ name, breed, age, avatarSrc }: DogProfileProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div className="flex items-center gap-4">
        <Avatar className="h-20 w-20">
          <AvatarImage src={avatarSrc} alt={name} />
          <AvatarFallback>{name.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-2xl font-bold">{name}&apos;s Dashboard</h1>
          <p className="text-muted-foreground">
            {breed}, {age} years old
          </p>
        </div>
      </div>
      <Button asChild>
        <Link href="/health-logs/new">Log Health Data</Link>
      </Button>
    </div>
  );
}
