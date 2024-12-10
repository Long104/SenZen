import React from "react";
import { Timeline } from "@/components/ui/timeline";
import { ChartWeek } from "@/components/example/chart-week";
import { ChartMonth } from "@example/chart-month";
import { HeroScrollDemo } from "@example/container-scroll-animation-demo";

export function TimelineDemo() {
	const data = [
		{
			title: "Week",
			content: (
				<div>
					<p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
						Save time and money with our revolutionary services. Our application
						will help you with your budgeting needs.
					</p>
					<ChartWeek />
				</div>
			),
		},
		{
			title: "Month",
			content: (
				<div>
					<p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
						Month of using our application will help you to manage your money,
						track your expenses and income, and plan your budget.
					</p>
					{/* <motion.div */}
					{/*       viewport={{ once: true }} */}
					{/*      > */}
					<ChartMonth />
					{/* </motion.div> */}
				</div>
			),
		},
		{
			title: "Result",
			content: (
				<div>
					<HeroScrollDemo />
				</div>
			),
		},
	];
	return (
		<div className="w-full">
			<Timeline data={data} />
		</div>
	);
}
