import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface HealthMetricCardProps {
  label: string;
  value: string;
  icon: React.ElementType;
}

export function HealthMetricCard({
  label,
  value,
  icon: Icon,
}: HealthMetricCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{label}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
}
