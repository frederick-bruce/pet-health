import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Pill } from "lucide-react";

interface MedicationScheduleProps {
  medicationName: string;
  dosage: string;
  frequency: string;
  nextDose: string;
  progressValue: number;
}

export function MedicationSchedule({
  medicationName,
  dosage,
  frequency,
  nextDose,
  progressValue,
}: MedicationScheduleProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Medication Schedule</CardTitle>
        <CardDescription>Next dose in {nextDose}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4">
          <Pill className="h-10 w-10 text-primary" />
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">{medicationName}</p>
            <p className="text-sm text-muted-foreground">
              {dosage}, {frequency}
            </p>
          </div>
        </div>
        <Progress value={progressValue} className="mt-4" />
      </CardContent>
    </Card>
  );
}
