"use client";
// api/plans.ts
import { fetchGet } from "@/fetch/client";

export const fetchUser = async (id:number | undefined) => {
	try {
		const response = await fetchGet(`user/${id}`);
		console.log("damn this is res", response);
		// return response.Plans;
		return response;
	} catch (error) {
		console.log("Error fetching plans:", error);
	}
	// return await fetchGet("plans");
};

