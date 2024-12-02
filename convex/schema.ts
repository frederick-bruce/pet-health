import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    tokenIdentifier: v.string(),
  }).index("by_token", ["tokenIdentifier"]),
  dogs: defineTable({
    name: v.string(),
    breed: v.string(),
    userId: v.id("users"),
  }),
  medications: defineTable({
    dogId: v.id("dogs"),
    name: v.string(),
    dosage: v.string(),
    frequency: v.string(),
    startDate: v.string(),
    endDate: v.optional(v.string()),
  }).index("by_dog", ["dogId"]),
  appointments: defineTable({
    dogId: v.id("dogs"),
    date: v.string(),
    time: v.string(),
    description: v.string(),
    veterinarian: v.string(),
    location: v.string(),
  }).index("by_dog", ["dogId"]),
  symptoms: defineTable({
    dogId: v.id("dogs"),
    date: v.string(),
    description: v.string(),
    severity: v.number(),
  }).index("by_dog", ["dogId"]),
  voiceNotes: defineTable({
    appointmentId: v.id("appointments"),
    storageId: v.string(),
    transcription: v.optional(v.string()),
  }),
});
