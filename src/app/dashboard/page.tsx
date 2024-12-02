"use client"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MedicationReminder } from "@/components/MedicationReminder";
import Link from "next/link";
import { Navigation } from "@/components/Navigation";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>My Dogs</CardTitle>
              <CardDescription>Manage your dog profiles</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/dogs" className="text-blue-500 hover:underline">View Dogs</Link>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Medications</CardTitle>
              <CardDescription>Track medications and schedules</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/medications" className="text-blue-500 hover:underline">View Medications</Link>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Appointments</CardTitle>
              <CardDescription>Manage vet appointments</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/appointments" className="text-blue-500 hover:underline">View Appointments</Link>
            </CardContent>
          </Card>
        </div>
        <div className="mt-6">
          <MedicationReminder />
        </div>
      </main>
    </div>
  )
}
