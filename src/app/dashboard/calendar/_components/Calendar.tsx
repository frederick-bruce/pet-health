"use client";

import React from "react";
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

// Setup the localizer for BigCalendar
const localizer = momentLocalizer(moment);

export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  allDay?: boolean;
  resource?: any;
}

interface CalendarProps {
  events: CalendarEvent[];
  onSelectEvent: (event: CalendarEvent) => void;
  onSelectSlot: (slotInfo: {
    start: Date;
    end: Date;
    slots: Date[] | string[];
  }) => void;
}

export function Calendar({
  events,
  onSelectEvent,
  onSelectSlot,
}: CalendarProps) {
  return (
    <BigCalendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      style={{ height: "calc(100vh - 10rem)" }}
      onSelectEvent={onSelectEvent}
      onSelectSlot={onSelectSlot}
      selectable
    />
  );
}
