"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

import { usePlan } from "@/hooks/usePlan";
import { z } from "zod";
import { PlanSchema } from "@/types";

export default function FinancialPlans() {
	type Plan = z.infer<typeof PlanSchema>;
	const { plansQuery, deletePlanMutation } = usePlan();
	const { data: plans } = plansQuery;

	const router = useRouter();
	async function goToPlan(planName: string, planId: number) {
		try {
			const formattedPlanName = planName.replace(/ /g, "_");
			router.push(`/plan/${formattedPlanName}?id=${planId}`);
		} catch (error) {
			console.log("cannot go to plan", error);
		}
	}

	async function handleDeletePlan(id: number) {
		deletePlanMutation.mutate(id);
		try {
		} catch (error) {
			console.log("cannot delete plan", error);
		}
	}

	return (
		<div className="min-h-screen dark:bg-gray-900">
			<div className="flex">
				<main className="flex-1 p-6 overflow-auto">
					<h1 className="text-3xl font-bold mb-6">Financial Plans Overview</h1>
					<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
						{Array.isArray(plans) && plans?.length > 0
							? plans?.map((plan: Plan) => (
									<Card
										key={plan.id}
										className="hover:shadow-lg transition-shadow"
									>
										<CardHeader>
											<CardTitle className="text-pretty truncate flex justify-between w-full">
												<div className="w-34 whitespace-nowrap overflow-hidden truncate">
													{plan.name}
												</div>
												<Button
													variant="destructive"
													onClick={() => handleDeletePlan(plan.id as number)}
												>
													X
												</Button>
											</CardTitle>
											<CardDescription>{plan.description}</CardDescription>
										</CardHeader>
										<CardContent>
											<Button
												variant="outline"
												className="w-full"
												onClick={() => {
													goToPlan(plan.name, plan.id as number);
												}}
											>
												View Details <ChevronRight className="ml-2 h-4 w-4" />
											</Button>
										</CardContent>
									</Card>
								))
							: ""}
					</div>
				</main>
			</div>
		</div>
	);
}
