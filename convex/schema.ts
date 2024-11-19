import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    email: v.string(),
    imageUrl: v.string(),
    clerkId: v.string(),
    name: v.string(),
  }).index("by_clerk_id", ["clerkId"]),

  dogs: defineTable({
    name: v.string(),
    breed: v.string(),
    dateOfBirth: v.number(), // Unix timestamp
    ownerId: v.id("users"), // Reference to users table
    avatarUrl: v.optional(v.string()),
  }).index("by_owner", ["ownerId"]),

  healthMetrics: defineTable({
    dogId: v.id("dogs"),
    type: v.string(), // e.g., "weight", "heart_rate", "activity"
    value: v.number(),
    unit: v.string(), // e.g., "kg", "bpm", "hours"
    timestamp: v.number(), // Unix timestamp
  }).index("by_dog_and_type", ["dogId", "type"]),

  medications: defineTable({
    dogId: v.id("dogs"),
    name: v.string(),
    dosage: v.string(),
    frequency: v.string(),
    startDate: v.number(), // Unix timestamp
    endDate: v.optional(v.number()), // Unix timestamp, optional for ongoing medications
    notes: v.optional(v.string()),
  }).index("by_dog", ["dogId"]),

  medicationLogs: defineTable({
    medicationId: v.id("medications"),
    timestamp: v.number(), // Unix timestamp
    administered: v.boolean(),
    notes: v.optional(v.string()),
  }).index("by_medication", ["medicationId"]),

  activities: defineTable({
    dogId: v.id("dogs"),
    type: v.string(), // e.g., "walk", "play", "training"
    duration: v.number(), // in minutes
    timestamp: v.number(), // Unix timestamp
    notes: v.optional(v.string()),
  }).index("by_dog", ["dogId"]),

  appointments: defineTable({
    dogId: v.id("dogs"),
    type: v.string(), // e.g., "vet_checkup", "grooming"
    date: v.number(), // Unix timestamp
    notes: v.optional(v.string()),
    completed: v.boolean(),
  }).index("by_dog", ["dogId"]),

  healthLogs: defineTable({
    dogId: v.id("dogs"),
    timestamp: v.number(), // Unix timestamp
    category: v.string(), // e.g., "symptom", "treatment", "observation"
    description: v.string(),
    severity: v.optional(v.number()), // 1-5 scale, if applicable
  }).index("by_dog", ["dogId"]),
});
