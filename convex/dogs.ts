import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createDog = mutation({
  args: {
    name: v.string(),
    breed: v.string(),
    dateOfBirth: v.number(),
    ownerId: v.id("users"),
    avatarUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const dogId = await ctx.db.insert("dogs", args);
    return dogId;
  },
});

export const getDogs = query({
  args: { ownerId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("dogs")
      .withIndex("by_owner", (q) => q.eq("ownerId", args.ownerId))
      .collect();
  },
});

export const updateDog = mutation({
  args: {
    id: v.id("dogs"),
    name: v.optional(v.string()),
    breed: v.optional(v.string()),
    dateOfBirth: v.optional(v.number()),
    avatarUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...updateFields } = args;
    await ctx.db.patch(id, updateFields);
  },
});

export const deleteDog = mutation({
  args: { id: v.id("dogs") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
