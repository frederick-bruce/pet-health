import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const add = mutation({
  args: {
    dogId: v.id("dogs"),
    date: v.string(),
    time: v.string(),
    description: v.string(),
    veterinarian: v.string(),
    location: v.string(),
  },
  handler: async (ctx, args) => {
    const appointmentId = await ctx.db.insert("appointments", args);
    return appointmentId;
  },
});

export const edit = mutation({
  args: {
    id: v.id("appointments"),
    date: v.string(),
    time: v.string(),
    description: v.string(),
    veterinarian: v.string(),
    location: v.string(),
  },
  handler: async (ctx, args) => {
    const { id, ...updateFields } = args;
    await ctx.db.patch(id, updateFields);
  },
});

export const remove = mutation({
  args: { id: v.id("appointments") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

export const list = query({
  args: { dogId: v.id("dogs") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("appointments")
      .withIndex("by_dog", (q) => q.eq("dogId", args.dogId))
      .collect();
  },
});

export const listAll = query({
  handler: async (ctx) => {
    return await ctx.db.query("appointments").collect();
  },
});

export const getById = query({
  args: { id: v.id("appointments") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});
