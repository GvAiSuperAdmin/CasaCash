import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const addExpense = mutation({
  args: { 
    category: v.string(), 
    authorizedBy: v.string(), 
    amount: v.number() 
  },
  handler: async (ctx, args) => {
    const expenseId = await ctx.db.insert("expenses", {
      category: args.category,
      authorizedBy: args.authorizedBy,
      amount: args.amount,
      recordedAt: Date.now(),
    });
    return expenseId;
  },
});

export const getExpenses = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("expenses").order("desc").collect();
  },
});

export const markAttendance = mutation({
  args: { 
    staffMember: v.string(), 
    status: v.string() 
  },
  handler: async (ctx, args) => {
    const attendanceId = await ctx.db.insert("attendance", {
      staffMember: args.staffMember,
      status: args.status,
      recordedAt: Date.now(),
    });
    return attendanceId;
  },
});

export const getAttendance = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("attendance").order("desc").collect();
  },
});
