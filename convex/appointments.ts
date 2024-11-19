import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const scheduleAppointment = mutation({
  args: {
    dogId: v.id("dogs"),
    type: v.string(),
    date: v.number(),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const appointmentId = await ctx.db.insert("appointments", {
      ...args,
      completed: false,
    });
    return appointmentId;
  },
});

export const getAppointments = query({
  args: { dogId: v.id("dogs") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("appointments")
      .withIndex("by_dog", (q) => q.eq("dogId", args.dogId))
      .order("asc")
      .filter((q) => q.eq(q.field("completed"), false))
      .collect();
  },
});

export const completeAppointment = mutation({
  args: { id: v.id("appointments") },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { completed: true });
  },
});
