import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface DogProfileProps {
  name: string;
  breed: string;
  age: number;
  avatarSrc: string;
  className?: string;
}

export function DogProfile({
  name,
  breed,
  age,
  avatarSrc,
  className,
}: DogProfileProps) {
  return (
    <Card className={className}>
      <CardContent className="flex items-center space-x-4 pt-6">
        <Avatar className="h-24 w-24">
          <AvatarImage src={avatarSrc} alt={name} />
          <AvatarFallback>{name[0]}</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-2xl font-bold">{name}</h2>
          <p className="text-muted-foreground">
            {breed}, {age} years old
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
