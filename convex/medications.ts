import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const add = mutation({
  args: {
    dogId: v.id("dogs"),
    name: v.string(),
    dosage: v.string(),
    frequency: v.string(),
    startDate: v.string(),
    endDate: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const medicationId = await ctx.db.insert("medications", {
      dogId: args.dogId,
      name: args.name,
      dosage: args.dosage,
      frequency: args.frequency,
      startDate: args.startDate,
      endDate: args.endDate,
    });
    return medicationId;
  },
});

export const list = query({
  args: { dogId: v.id("dogs") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("medications")
      .withIndex("by_dog", (q) => q.eq("dogId", args.dogId))
      .collect();
  },
});

export const listAll = query({
  handler: async (ctx) => {
    return await ctx.db.query("medications").collect();
  },
});
