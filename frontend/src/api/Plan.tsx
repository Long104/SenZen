"use client";
// api/plans.ts
import { fetchGet, fetchPost } from "@/fetch/client";
import { PlanSchema } from "@/types";
import { z } from "zod";
type Plan = z.infer<typeof PlanSchema>;

export const fetchPlans = async (id: number | undefined) => {
	try {
		const response = await fetchGet(`plans/${id}`);
		console.log("this is res from plansss", response);
		// return response.Plans;
		return response;
	} catch (error) {
		console.log("Error fetching plans:", error);
	}
	// return await fetchGet("plans");
};

export const fetchPlan = async (id: string | null) => {
	try {
		const response = await fetchGet(`plan/${id}`);
		console.log("this is res from plannnn", response);
		// return response.Plans;
		return response;
	} catch (error) {
		console.log("Error fetching plans:", error);
	}
	// return await fetchGet("plans");
};

export const createPlan = async (newPlan: Partial<Plan>) => {
	return await fetchPost("plan", newPlan);
};
