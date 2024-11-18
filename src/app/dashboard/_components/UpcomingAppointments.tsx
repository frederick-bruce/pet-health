import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clipboard } from "lucide-react";

interface UpcomingAppointmentProps {
  appointmentType: string;
  date: string;
  time: string;
}

export function UpcomingAppointment({
  appointmentType,
  date,
  time,
}: UpcomingAppointmentProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Appointments</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4">
          <Clipboard className="h-10 w-10 text-primary" />
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">
              {appointmentType}
            </p>
            <p className="text-sm text-muted-foreground">
              {date} at {time}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
