import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface RecentActivitiesProps {
  activities: { date: string; activity: string }[];
  className?: string;
}

export function RecentActivities({
  activities,
  className,
}: RecentActivitiesProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Recent Activities</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {activities.map((item, index) => (
            <li key={index} className="flex justify-between text-sm">
              <span>{item.activity}</span>
              <span className="text-muted-foreground">{item.date}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
