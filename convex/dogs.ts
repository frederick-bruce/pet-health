import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Id } from "./_generated/dataModel";

export const add = mutation({
  args: { name: v.string(), breed: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Called storeUser without authentication present");
    }

    // Get or create the user
    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier)
      )
      .unique();

    let userId: Id<"users">;
    if (!user) {
      userId = await ctx.db.insert("users", {
        name: identity.name!,
        email: identity.email!,
        tokenIdentifier: identity.tokenIdentifier,
      });
    } else {
      userId = user._id;
    }

    const dogId = await ctx.db.insert("dogs", {
      name: args.name,
      breed: args.breed,
      userId,
    });
    return dogId;
  },
});

export const list = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Called storeUser without authentication present");
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier)
      )
      .unique();

    if (!user) {
      return [];
    }

    return await ctx.db
      .query("dogs")
      .filter((q) => q.eq(q.field("userId"), user._id))
      .collect();
  },
});
