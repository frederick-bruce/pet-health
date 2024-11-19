import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CalendarEvent } from "./Calendar";

interface EventFormProps {
  event?: CalendarEvent;
  onSubmit: (data: CalendarEvent) => void;
  onCancel: () => void;
}

export function EventForm({ event, onSubmit, onCancel }: EventFormProps) {
  const { register, handleSubmit } = useForm<CalendarEvent>({
    defaultValues: event || {
      id: "",
      title: "",
      start: new Date(),
      end: new Date(),
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="title">Event Title</Label>
        <Input id="title" {...register("title", { required: true })} />
      </div>
      <div>
        <Label htmlFor="start">Start Date</Label>
        <Input
          id="start"
          type="datetime-local"
          {...register("start", { required: true })}
        />
      </div>
      <div>
        <Label htmlFor="end">End Date</Label>
        <Input
          id="end"
          type="datetime-local"
          {...register("end", { required: true })}
        />
      </div>
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
}
