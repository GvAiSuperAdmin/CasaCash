import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  expenses: defineTable({
    category: v.string(),
    authorizedBy: v.string(),
    amount: v.number(),
    recordedAt: v.number(), // timestamp
  }),
  
  attendance: defineTable({
    staffMember: v.string(),
    status: v.string(),
    recordedAt: v.number(), // timestamp
  }),
});
