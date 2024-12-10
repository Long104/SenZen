"use client";

import * as React from "react";
import {
	GalleryVerticalEnd,
	Settings2,
	Package,
	Building2,
	NotebookPen,
	Newspaper,
	House,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import { Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarRail,
} from "@/components/ui/sidebar";

import useAuthStore from "@/zustand/auth";
// This is sample data.
import { usePlan } from "@/hooks/usePlan";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const users = useAuthStore((state) => state.user);
	const { plansQuery } = usePlan();
	const { data: plans } = plansQuery;
	const data = {
		user: {
			name: users?.name,
			email: users?.email,
			avatar: "/logo.webp",
		},
		teams: [
			{
				name: "CashWise",
				logo: Building2,
				plan: "Company",
			},
			{
				name: "Pricing",
				logo: Package,
				plan: "pricing",
			},
			{
				name: "About Us",
				logo: GalleryVerticalEnd,
				plan: "About us",
			},
		],
		navMain: [
			{
				title: "Plan",
				url: "#",
				icon: NotebookPen,
				// isActive: true,
				items: 
					plans?.map((plan: any) => ({
						title: plan?.name || "Unnamed Plan",
						url: `/plan/${plan?.name}/?id=${plan.id}`,
					})) || [],
			},
			{
				title: "News&Forums",
				url: "#",
				icon: Newspaper,
				items: [
					{
						title: "Money",
						url: "#",
					},
					{
						title: "Saving",
						url: "#",
					},
					{
						title: "Story",
						url: "#",
					},
				],
			},
			{
				title: "Settings",
				url: "#",
				icon: Settings2,
				items: [
					{
						title: "General",
						url: "#",
					},
					{
						title: "Team",
						url: "#",
					},
					{
						title: "Billing",
						url: "#",
					},
					{
						title: "Limits",
						url: "#",
					},
				],
			},
		],
		projects: [
			{
				name: "Home",
				url: "/home",
				icon: House,
			},
			{
				name: "Plan",
				url: "#plan",
				icon: Newspaper,
			},
			{
				name: "News",
				url: "#news",
				icon: Newspaper,
			},
		],
	};
	// useEffect(() => {}, []);
	return (
		<>
			<Sidebar collapsible="icon" {...props}>
				<SidebarHeader>
					<TeamSwitcher teams={data.teams} />
				</SidebarHeader>
				<SidebarContent>
					<NavMain items={data.navMain} />
					<NavProjects projects={data.projects} />
				</SidebarContent>
				<SidebarFooter>
					<NavUser user={data.user} />
				</SidebarFooter>
				<SidebarRail />
			</Sidebar>
		</>
	);
}
