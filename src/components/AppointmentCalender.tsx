"use client";

import * as React from "react";
import { addDays, format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useQuery } from "convex/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { api } from "../../convex/_generated/api";

export function AppointmentCalendar() {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 20),
  });
  const appointments = useQuery(api.appointments.listAll) || [];

  const appointmentsInRange = appointments.filter((appointment) => {
    const appointmentDate = new Date(appointment.date);
    return (
      date &&
      date.from &&
      date.to &&
      appointmentDate >= date.from &&
      appointmentDate <= date.to
    );
  });

  return (
    <div className="grid gap-4">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
      <div className="grid gap-4">
        {appointmentsInRange.map((appointment) => (
          <Card key={appointment._id}>
            <CardHeader>
              <CardTitle>{appointment.description}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Date: {appointment.date}</p>
              <p>Time: {appointment.time}</p>
              <p>Veterinarian: {appointment.veterinarian}</p>
              <p>Location: {appointment.location}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
