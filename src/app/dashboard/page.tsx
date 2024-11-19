import React from "react";

import { Activity, Heart, Weight } from "lucide-react";
import { DogProfile } from "./_components/DogProfile";
import { HealthMetricCard } from "./_components/HealthMetricCard";
import { MedicationSchedule } from "./_components/MedicationSchedule";
import { RecentActivities } from "./_components/RecentActivities";
import { UpcomingAppointment } from "./_components/UpcomingAppointments";

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

export default function DashboardPage() {
  return (
    <div className="space-y-6 p-8 pt-6">
      <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <DogProfile
          className="md:col-span-2 lg:col-span-3"
          name="Buddy"
          breed="Golden Retriever"
          age={3}
          avatarSrc="/placeholder.svg?height=100&width=100"
        />
        <div className="grid gap-6 md:col-span-2 lg:col-span-4 lg:grid-cols-2">
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
          className="md:col-span-2 lg:col-span-3"
          medicationName="Heartworm Prevention"
          dosage="1 tablet"
          frequency="once a month"
          nextDose="2 hours"
          progressValue={33}
        />
        <RecentActivities
          className="md:col-span-2 lg:col-span-2"
          activities={recentActivities}
        />
        <UpcomingAppointment
          className="md:col-span-2 lg:col-span-2"
          appointmentType="Annual Checkup"
          date="July 30, 2023"
          time="10:00 AM"
        />
      </div>
    </div>
  );
}
