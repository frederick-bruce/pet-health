import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface MedicationScheduleProps {
  medicationName: string;
  dosage: string;
  frequency: string;
  nextDose: string;
  progressValue: number;
  className?: string;
}

export function MedicationSchedule({
  medicationName,
  dosage,
  frequency,
  nextDose,
  progressValue,
  className,
}: MedicationScheduleProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Medication Schedule</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p className="text-lg font-medium">{medicationName}</p>
          <p className="text-sm text-muted-foreground">
            {dosage}, {frequency}
          </p>
          <div className="flex items-center space-x-2">
            <Progress value={progressValue} className="w-full" />
            <span className="text-sm font-medium">{nextDose}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
