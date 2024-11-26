"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Navigation } from "@/components/Navigation";

export default function Dogs() {
  const [newDogName, setNewDogName] = useState("");
  const [newDogBreed, setNewDogBreed] = useState("");

  const dogs = useQuery(api.dogs.list) || [];
  const addDog = useMutation(api.dogs.add);

  const handleAddDog = async (e: React.FormEvent) => {
    e.preventDefault();
    await addDog({ name: newDogName, breed: newDogBreed });
    setNewDogName("");
    setNewDogBreed("");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">My Dogs</h1>
        <form onSubmit={handleAddDog} className="mb-8">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="dogName">Dog Name</Label>
            <Input
              type="text"
              id="dogName"
              value={newDogName}
              onChange={(e) => setNewDogName(e.target.value)}
              required
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5 mt-4">
            <Label htmlFor="dogBreed">Dog Breed</Label>
            <Input
              type="text"
              id="dogBreed"
              value={newDogBreed}
              onChange={(e) => setNewDogBreed(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="mt-4">
            Add Dog
          </Button>
        </form>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dogs.map((dog) => (
            <div key={dog._id} className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-2">{dog.name}</h2>
              <p className="text-gray-600">{dog.breed}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
