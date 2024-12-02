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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Id } from "../../../convex/_generated/dataModel";
import { api } from "../../../convex/_generated/api";
import { useToast } from "@/hooks/use-toast";
import { Navigation } from "@/components/Navigation";

type AppointmentForm = {
  dogId: Id<"dogs"> | null;
  date: string;
  time: string;
  description: string;
  veterinarian: string;
  location: string;
};

export default function Appointments() {
  const dogs = useQuery(api.dogs.list) || [];
  const appointments = useQuery(api.appointments.listAll) || [];
  const addAppointment = useMutation(api.appointments.add);
  const editAppointment = useMutation(api.appointments.edit);
  const deleteAppointment = useMutation(api.appointments.remove);
  const { toast } = useToast();

  const [newAppointment, setNewAppointment] = useState<AppointmentForm>({
    dogId: null,
    date: "",
    time: "",
    description: "",
    veterinarian: "",
    location: "",
  });

  const [editingAppointment, setEditingAppointment] = useState<
    (AppointmentForm & { id: Id<"appointments"> }) | null
  >(null);

  const handleAddAppointment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newAppointment.dogId) {
      try {
        await addAppointment({
          dogId: newAppointment.dogId,
          date: newAppointment.date,
          time: newAppointment.time,
          description: newAppointment.description,
          veterinarian: newAppointment.veterinarian,
          location: newAppointment.location,
        });
        setNewAppointment({
          dogId: null,
          date: "",
          time: "",
          description: "",
          veterinarian: "",
          location: "",
        });
        toast({
          title: "Success",
          description: "Appointment added successfully",
        });
      } catch (error) {
        console.error("Error adding appointment:", error);
        toast({
          title: "Error",
          description: "Failed to add appointment",
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

  const handleEditAppointment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingAppointment) {
      try {
        await editAppointment({
          id: editingAppointment.id,
          date: editingAppointment.date,
          time: editingAppointment.time,
          description: editingAppointment.description,
          veterinarian: editingAppointment.veterinarian,
          location: editingAppointment.location,
        });
        setEditingAppointment(null);
        toast({
          title: "Success",
          description: "Appointment updated successfully",
        });
      } catch (error) {
        console.error("Error updating appointment:", error);
        toast({
          title: "Error",
          description: "Failed to update appointment",
          variant: "destructive",
        });
      }
    }
  };

  const handleDeleteAppointment = async (id: Id<"appointments">) => {
    if (confirm("Are you sure you want to delete this appointment?")) {
      try {
        await deleteAppointment({ id });
        toast({
          title: "Success",
          description: "Appointment deleted successfully",
        });
      } catch (error) {
        console.error("Error deleting appointment:", error);
        toast({
          title: "Error",
          description: "Failed to delete appointment",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Appointments</h1>
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Add New Appointment</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddAppointment} className="space-y-4">
              <div>
                <Label htmlFor="dogId">Dog</Label>
                <Select
                  value={newAppointment.dogId?.toString() || ""}
                  onValueChange={(value) =>
                    setNewAppointment({
                      ...newAppointment,
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
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={newAppointment.date}
                  onChange={(e) =>
                    setNewAppointment({
                      ...newAppointment,
                      date: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="time">Time</Label>
                <Input
                  id="time"
                  type="time"
                  value={newAppointment.time}
                  onChange={(e) =>
                    setNewAppointment({
                      ...newAppointment,
                      time: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={newAppointment.description}
                  onChange={(e) =>
                    setNewAppointment({
                      ...newAppointment,
                      description: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="veterinarian">Veterinarian</Label>
                <Input
                  id="veterinarian"
                  value={newAppointment.veterinarian}
                  onChange={(e) =>
                    setNewAppointment({
                      ...newAppointment,
                      veterinarian: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={newAppointment.location}
                  onChange={(e) =>
                    setNewAppointment({
                      ...newAppointment,
                      location: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <Button type="submit">Add Appointment</Button>
            </form>
          </CardContent>
        </Card>
        <div className="space-y-4">
          {appointments.map((appointment) => (
            <Card key={appointment._id}>
              <CardHeader>
                <CardTitle>{appointment.description}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Date: {appointment.date}</p>
                <p>Time: {appointment.time}</p>
                <p>Veterinarian: {appointment.veterinarian}</p>
                <p>Location: {appointment.location}</p>
                <div className="mt-4 space-x-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        onClick={() =>
                          setEditingAppointment({
                            ...appointment,
                            id: appointment._id,
                          })
                        }
                      >
                        Edit
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit Appointment</DialogTitle>
                      </DialogHeader>
                      <form
                        onSubmit={handleEditAppointment}
                        className="space-y-4"
                      >
                        <div>
                          <Label htmlFor="edit-date">Date</Label>
                          <Input
                            id="edit-date"
                            type="date"
                            value={editingAppointment?.date || ""}
                            onChange={(e) =>
                              setEditingAppointment((prev) =>
                                prev ? { ...prev, date: e.target.value } : null
                              )
                            }
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="edit-time">Time</Label>
                          <Input
                            id="edit-time"
                            type="time"
                            value={editingAppointment?.time || ""}
                            onChange={(e) =>
                              setEditingAppointment((prev) =>
                                prev ? { ...prev, time: e.target.value } : null
                              )
                            }
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="edit-description">Description</Label>
                          <Input
                            id="edit-description"
                            value={editingAppointment?.description || ""}
                            onChange={(e) =>
                              setEditingAppointment((prev) =>
                                prev
                                  ? { ...prev, description: e.target.value }
                                  : null
                              )
                            }
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="edit-veterinarian">
                            Veterinarian
                          </Label>
                          <Input
                            id="edit-veterinarian"
                            value={editingAppointment?.veterinarian || ""}
                            onChange={(e) =>
                              setEditingAppointment((prev) =>
                                prev
                                  ? { ...prev, veterinarian: e.target.value }
                                  : null
                              )
                            }
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="edit-location">Location</Label>
                          <Input
                            id="edit-location"
                            value={editingAppointment?.location || ""}
                            onChange={(e) =>
                              setEditingAppointment((prev) =>
                                prev
                                  ? { ...prev, location: e.target.value }
                                  : null
                              )
                            }
                            required
                          />
                        </div>
                        <Button type="submit">Update Appointment</Button>
                      </form>
                    </DialogContent>
                  </Dialog>
                  <Button
                    variant="destructive"
                    onClick={() => handleDeleteAppointment(appointment._id)}
                  >
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
