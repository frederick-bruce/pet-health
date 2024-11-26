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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Id } from "../../../convex/_generated/dataModel";
import { api } from "../../../convex/_generated/api";
import { useToast } from "@/hooks/use-toast";
import { Navigation } from "@/components/Navigation";

type MedicationForm = {
  dogId: Id<"dogs"> | null;
  name: string;
  dosage: string;
  frequency: string;
  startDate: string;
  endDate?: string;
};

export default function Medications() {
  const dogs = useQuery(api.dogs.list) || [];
  const medications = useQuery(api.medications.listAll) || [];
  const addMedication = useMutation(api.medications.add);
  const editMedication = useMutation(api.medications.edit);
  const deleteMedication = useMutation(api.medications.remove);
  const { toast } = useToast();

  const [newMedication, setNewMedication] = useState<MedicationForm>({
    dogId: null,
    name: "",
    dosage: "",
    frequency: "",
    startDate: "",
    endDate: "",
  });

  const [editingMedication, setEditingMedication] = useState<
    (MedicationForm & { id: Id<"medications"> }) | null
  >(null);

  const handleAddMedication = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newMedication.dogId) {
      try {
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
        toast({
          title: "Success",
          description: "Medication added successfully",
        });
      } catch (error) {
        console.error("Error adding medication:", error);
        toast({
          title: "Error",
          description: "Failed to add medication",
          variant: "destructive",
        });
      }
    } else {
      toast({
        title: "Error",
        description: "Please select a dog",
        variant: "destructive",
      });
    }
  };

  const handleEditMedication = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingMedication) {
      try {
        await editMedication({
          id: editingMedication.id,
          name: editingMedication.name,
          dosage: editingMedication.dosage,
          frequency: editingMedication.frequency,
          startDate: editingMedication.startDate,
          endDate: editingMedication.endDate || undefined,
        });
        setEditingMedication(null);
        toast({
          title: "Success",
          description: "Medication updated successfully",
        });
      } catch (error) {
        console.error("Error updating medication:", error);
        toast({
          title: "Error",
          description: "Failed to update medication",
          variant: "destructive",
        });
      }
    }
  };

  const handleDeleteMedication = async (id: Id<"medications">) => {
    if (confirm("Are you sure you want to delete this medication?")) {
      try {
        await deleteMedication({ id });
        toast({
          title: "Success",
          description: "Medication deleted successfully",
        });
      } catch (error) {
        console.error("Error deleting medication:", error);
        toast({
          title: "Error",
          description: "Failed to delete medication",
          variant: "destructive",
        });
      }
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
              <div className="mt-4 space-x-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      onClick={() =>
                        setEditingMedication({
                          ...medication,
                          id: medication._id,
                          endDate: medication.endDate || "",
                        })
                      }
                    >
                      Edit
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit Medication</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleEditMedication} className="space-y-4">
                      <div>
                        <Label htmlFor="edit-name">Medication Name</Label>
                        <Input
                          id="edit-name"
                          value={editingMedication?.name || ""}
                          onChange={(e) =>
                            setEditingMedication((prev) =>
                              prev ? { ...prev, name: e.target.value } : null
                            )
                          }
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="edit-dosage">Dosage</Label>
                        <Input
                          id="edit-dosage"
                          value={editingMedication?.dosage || ""}
                          onChange={(e) =>
                            setEditingMedication((prev) =>
                              prev ? { ...prev, dosage: e.target.value } : null
                            )
                          }
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="edit-frequency">Frequency</Label>
                        <Input
                          id="edit-frequency"
                          value={editingMedication?.frequency || ""}
                          onChange={(e) =>
                            setEditingMedication((prev) =>
                              prev
                                ? { ...prev, frequency: e.target.value }
                                : null
                            )
                          }
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="edit-startDate">Start Date</Label>
                        <Input
                          id="edit-startDate"
                          type="date"
                          value={editingMedication?.startDate || ""}
                          onChange={(e) =>
                            setEditingMedication((prev) =>
                              prev
                                ? { ...prev, startDate: e.target.value }
                                : null
                            )
                          }
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="edit-endDate">
                          End Date (Optional)
                        </Label>
                        <Input
                          id="edit-endDate"
                          type="date"
                          value={editingMedication?.endDate || ""}
                          onChange={(e) =>
                            setEditingMedication((prev) =>
                              prev ? { ...prev, endDate: e.target.value } : null
                            )
                          }
                        />
                      </div>
                      <Button type="submit">Update Medication</Button>
                    </form>
                  </DialogContent>
                </Dialog>
                <Button
                  variant="destructive"
                  onClick={() => handleDeleteMedication(medication._id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
