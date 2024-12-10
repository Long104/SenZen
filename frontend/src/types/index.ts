import { z } from "zod";

export const BudgetSchema = z.object({
	id: z.number(),
	user_id: z.number(),
	categoryId: z.number(),
	plan_id: z.number(),
	amount: z.number(),
	remaining: z.number(),
	startDate: z.date(),
	endDate: z.date(),
	createdAt: z.date(),
	plan: z.object({
		id: z.number(),
		user_id: z.number(),
		name: z.string(),
		plan_type: z.string(),
		visibility: z.string(),
		duration: z.string(),
		description: z.string().optional(),
		auto_save: z.boolean(),
		initial_budget: z.number(),
		createdAt: z.date(),
		budgets: z.array(z.object({ id: z.number() })),
		transactions: z.array(z.object({ id: z.number() })),
		categories: z.array(z.object({ id: z.number() })),
	}),
	category: z.object({
		id: z.number(),
		name: z.string(),
		description: z.string().optional(),
		user_id: z.number(),
		plan_id: z.number(),
		budgets: z.array(z.object({ id: z.number() })),
		transactions: z.array(z.object({ id: z.number() })),
	}),
});

export const CategorySchema = z.object({
	id: z.number(),
	name: z.string(),
	description: z.string().optional(),
	user_id: z.number(),
	plan_id: z.number(),
	budgets: z.array(BudgetSchema),
	transactions: z.array(z.object({ id: z.number() })),
});

export const TransactionSchema = z.object({
	id: z.number().optional(),
	budget_id: z.number(),
	plan_id: z.number().optional(),
	category_id: z.number(),
	amount: z.number(),
	transaction_date: z.string(),
	description: z.string().optional(),
	category: CategorySchema.optional(),
});

export const UserSchema = z.object({
	id: z.number(),
	name: z.string(),
	password: z.string().optional(),
	email: z.string(),
	createdAt: z.date(),
	updatedAt: z.date(),
	plans: z.array(z.object({ id: z.number() })),
});

export const PlanSchema = z.object({
	id: z.number().optional(),
	user_id: z.number().optional(),
	name: z.string(),
	plan_type: z.string(),
	visibility: z.string(),
	duration: z.string(),
	description: z.string().optional(),
	auto_save: z.boolean(),
	initial_budget: z.number().optional(),
	createdAt: z.date().optional(),
	user: UserSchema.optional(),
	budgets: z.array(BudgetSchema).optional(),
	transactions: z.array(TransactionSchema).optional(),
	categories: z.array(CategorySchema).optional(),
});
