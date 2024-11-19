import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";

interface UpcomingAppointmentProps {
  appointmentType: string;
  date: string;
  time: string;
  className?: string;
}

export function UpcomingAppointment({
  appointmentType,
  date,
  time,
  className,
}: UpcomingAppointmentProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Upcoming Appointment</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4">
          <Calendar className="h-10 w-10 text-primary" />
          <div className="space-y-1">
            <p className="text-lg font-medium">{appointmentType}</p>
            <p className="text-sm text-muted-foreground">
              {date} at {time}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
