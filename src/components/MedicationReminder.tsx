import { useState, useEffect } from "react";
import { useQuery } from "convex/react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { api } from "../../convex/_generated/api";

export function MedicationReminder() {
  const { toast } = useToast();
  const medicationsQuery = useQuery(api.medications.listAll);
  const [nextReminders, setNextReminders] = useState<
    Array<{ time: Date; medications: string[] }>
  >([]);

  useEffect(() => {
    if (!medicationsQuery) return;

    const checkReminders = () => {
      const now = new Date();
      const reminders: { [key: string]: string[] } = {};

      medicationsQuery.forEach((medication) => {
        const [hours, minutes] = medication.frequency.split(":").map(Number);
        const reminderTime = new Date(now);
        reminderTime.setHours(hours, minutes, 0, 0);

        if (reminderTime > now) {
          const timeKey = reminderTime.toISOString();
          if (!reminders[timeKey]) {
            reminders[timeKey] = [];
          }
          reminders[timeKey].push(`${medication.name} (${medication.dosage})`);
        }

        if (reminderTime.getTime() === now.getTime()) {
          toast({
            title: "Medication Reminder",
            description: `Time to take ${medication.name} (${medication.dosage})`,
          });
        }
      });

      const sortedReminders = Object.entries(reminders)
        .sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime())
        .slice(0, 3)
        .map(([time, meds]) => ({ time: new Date(time), medications: meds }));

      setNextReminders(sortedReminders);
    };

    checkReminders();
    const interval = setInterval(checkReminders, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [medicationsQuery, toast]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Medication Reminders</CardTitle>
      </CardHeader>
      <CardContent>
        {medicationsQuery ? (
          nextReminders.length > 0 ? (
            <ul className="space-y-2">
              {nextReminders.map((reminder, index) => (
                <li key={index} className="bg-gray-100 p-2 rounded">
                  <p className="font-semibold">
                    {reminder.time.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                  <ul className="list-disc list-inside">
                    {reminder.medications.map((med, medIndex) => (
                      <li key={medIndex}>{med}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          ) : (
            <p>No upcoming reminders</p>
          )
        ) : (
          <p>Loading medications...</p>
        )}
      </CardContent>
    </Card>
  );
}
