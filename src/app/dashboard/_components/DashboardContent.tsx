import React from "react";

import { Activity, Heart, Weight } from "lucide-react";
import { DogProfile } from "./DogProfile";
import { HealthMetricCard } from "./HealthMetricCard";
import { MedicationSchedule } from "../MedicationSchedule";
import { RecentActivities } from "../RecentActivities";
import { UpcomingAppointment } from "./UpcomingAppointments";

const healthMetrics = [
  { label: "Weight", value: "15.5 kg", icon: Weight },
  { label: "Heart Rate", value: "80 bpm", icon: Heart },
  { label: "Activity", value: "2.5 hrs", icon: Activity },
];

const recentActivities = [
  { date: "2023-07-15", activity: "Vet checkup" },
  { date: "2023-07-14", activity: "Grooming session" },
  { date: "2023-07-13", activity: "Vaccination" },
];

export default function DashboardContent() {
  return (
    <div className="space-y-6">
      <DogProfile
        name="Buddy"
        breed="Golden Retriever"
        age={3}
        avatarSrc="/placeholder.svg?height=80&width=80"
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {healthMetrics.map((metric, index) => (
          <HealthMetricCard
            key={index}
            label={metric.label}
            value={metric.value}
            icon={metric.icon}
          />
        ))}
      </div>

      <MedicationSchedule
        medicationName="Heartworm Prevention"
        dosage="1 tablet"
        frequency="once a month"
        nextDose="2 hours"
        progressValue={33}
      />

      <RecentActivities activities={recentActivities} />

      <UpcomingAppointment
        appointmentType="Annual Checkup"
        date="July 30, 2023"
        time="10:00 AM"
      />
    </div>
  );
}
