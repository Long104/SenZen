"use client";
import React from "react";
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	Legend,
	ResponsiveContainer,
} from "recharts";

const data = [
	{
		name: "Monday",
		before: 1000,
		after: 900,
		result: 2400,
	},
	{
		name: "Tuesday",
		before: 1000,
		after: 800,
		result: 2400,
	},
	{
		name: "Wednesday",
		before: 1000,
		after: 900,
		result: 2400,
	},
	{
		name: "Thursday",
		before: 1000,
		after: 700,
		result: 2400,
	},
	{
		name: "Friday",
		before: 1000,
		after: 850,
		result: 2400,
	},
	{
		name: "Saturday",
		before: 1000,
		after: 900,
		result: 2400,
	},
	{
		name: "Sunday",
		before: 1000,
		after: 600,
		result: 2400,
	},
];

export function ChartWeek() {
	return (
		<ResponsiveContainer width={"100%"} height={"100%"}>
			<BarChart width={650} height={300} data={data}>
				<XAxis dataKey="name" />
				<YAxis />
				{/* <Tooltip /> */}
				<Legend verticalAlign="top" height={36} />
				<Bar dataKey="before" fill="#EC5800" />
				<Bar dataKey="after" fill="#FFAC1C" />
			</BarChart>
		</ResponsiveContainer>
	);
}

