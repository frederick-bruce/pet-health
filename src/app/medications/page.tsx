"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";
import { Navigation } from "@/components/Navigation";

export default function Medications() {
  const dogs = useQuery(api.dogs.list) || [];
  const medications = useQuery(api.medications.listAll) || [];
  const addMedication = useMutation(api.medications.add);

  const [newMedication, setNewMedication] = useState<{
    dogId: Id<"dogs"> | null;
    name: string;
    dosage: string;
    frequency: string;
    startDate: string;
    endDate: string;
  }>({
    dogId: null,
    name: "",
    dosage: "",
    frequency: "",
    startDate: "",
    endDate: "",
  });

  const handleAddMedication = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newMedication.dogId) {
      await addMedication({
        dogId: newMedication.dogId,
        name: newMedication.name,
        dosage: newMedication.dosage,
        frequency: newMedication.frequency,
        startDate: newMedication.startDate,
        endDate: newMedication.endDate || undefined,
      });
      setNewMedication({
        dogId: null,
        name: "",
        dosage: "",
        frequency: "",
        startDate: "",
        endDate: "",
      });
    } else {
      console.error("Please select a dog");
      // You might want to show an error message to the user here
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Medications</h1>
        <form onSubmit={handleAddMedication} className="mb-8 space-y-4">
          <div>
            <Label htmlFor="dogId">Dog</Label>
            <Select
              value={newMedication.dogId?.toString() || ""}
              onValueChange={(value) =>
                setNewMedication({
                  ...newMedication,
                  dogId: value as Id<"dogs">,
                })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a dog" />
              </SelectTrigger>
              <SelectContent>
                {dogs.map((dog) => (
                  <SelectItem key={dog._id} value={dog._id}>
                    {dog.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="name">Medication Name</Label>
            <Input
              id="name"
              value={newMedication.name}
              onChange={(e) =>
                setNewMedication({ ...newMedication, name: e.target.value })
              }
              required
            />
          </div>
          <div>
            <Label htmlFor="dosage">Dosage</Label>
            <Input
              id="dosage"
              value={newMedication.dosage}
              onChange={(e) =>
                setNewMedication({ ...newMedication, dosage: e.target.value })
              }
              required
            />
          </div>
          <div>
            <Label htmlFor="frequency">Frequency</Label>
            <Input
              id="frequency"
              value={newMedication.frequency}
              onChange={(e) =>
                setNewMedication({
                  ...newMedication,
                  frequency: e.target.value,
                })
              }
              required
            />
          </div>
          <div>
            <Label htmlFor="startDate">Start Date</Label>
            <Input
              id="startDate"
              type="date"
              value={newMedication.startDate}
              onChange={(e) =>
                setNewMedication({
                  ...newMedication,
                  startDate: e.target.value,
                })
              }
              required
            />
          </div>
          <div>
            <Label htmlFor="endDate">End Date (Optional)</Label>
            <Input
              id="endDate"
              type="date"
              value={newMedication.endDate}
              onChange={(e) =>
                setNewMedication({ ...newMedication, endDate: e.target.value })
              }
            />
          </div>
          <Button type="submit">Add Medication</Button>
        </form>
        <div className="space-y-4">
          {medications.map((medication) => (
            <div
              key={medication._id}
              className="bg-white shadow-md rounded-lg p-6"
            >
              <h2 className="text-xl font-semibold mb-2">{medication.name}</h2>
              <p>Dosage: {medication.dosage}</p>
              <p>Frequency: {medication.frequency}</p>
              <p>Start Date: {medication.startDate}</p>
              {medication.endDate && <p>End Date: {medication.endDate}</p>}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
