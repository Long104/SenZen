"use client";

import * as React from "react";
import Link from "next/link";

import { ModeToggle } from "@/components/mode-toggle";
import { cn } from "@/lib/utils";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { ProfileDropdown } from "@/components/ui/profile-dropdown";

const components: { title: string; href: string; description: string }[] = [
	{
		title: "View plan",
		href: "/docs/primitives/alert-dialog",
		description: "view your plan",
	},
];

export function NavigationMenuDemo() {
	return (
		// <NavigationMenu className="[&_*]:bg-primary [&_*]:text-accent-foreground z-50">
		<NavigationMenu className="[&>*]:bg-primary [&>*]:text-accent-foreground z-50">
			<NavigationMenuList>
				<NavigationMenuItem>
					<Link href="/createPlan">
						<NavigationMenuTrigger>Create Plan</NavigationMenuTrigger>
						<NavigationMenuContent>
							{/* <ul className="grid gap-2 p-6 md:w-[400px] lg:w-[400px] lg:grid-cols-1"> */}
							{/* 	<ListItem href="/docs" title="Weekly"> */}
							{/* 		Create your budgeting plan for weekly */}
							{/* 	</ListItem> */}
							{/* 	<ListItem href="/docs/installation" title="Monthly"> */}
							{/* 		Create your budgeting plan for monthly */}
							{/* 	</ListItem> */}
							{/* 	<ListItem href="/docs/primitives/typography" title="Customize"> */}
							{/* 		Customize your budgeting plan */}
							{/* 	</ListItem> */}
							{/* </ul> */}
						</NavigationMenuContent>
					</Link>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<Link href="/viewPlan">
						<NavigationMenuTrigger>View Plan</NavigationMenuTrigger>
					</Link>
					<NavigationMenuContent>
						<ul className="grid w-[400px] gap-3 p-2 md:w-[400px] md:grid-cols-1 lg:w-[400px] ">
							{components.map((component) => (
								<ListItem
									key={component.title}
									title={component.title}
									href={component.href}
								>
									{component.description}
								</ListItem>
							))}
						</ul>
					</NavigationMenuContent>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<ProfileDropdown />
				</NavigationMenuItem>
				<NavigationMenuItem className="p-2">
					<ModeToggle />
				</NavigationMenuItem>
			</NavigationMenuList>
		</NavigationMenu>
	);
}

const ListItem = React.forwardRef<
	React.ElementRef<"a">,
	React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
	return (
		<li>
			<NavigationMenuLink asChild>
				<a
					ref={ref}
					className={cn(
						"block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
						className,
					)}
					{...props}
				>
					<div className="text-sm font-medium leading-none">{title}</div>
					<p className=" line-clamp-2 text-sm leading-snug text-muted-foreground">
						{children}
					</p>
				</a>
			</NavigationMenuLink>
		</li>
	);
});
ListItem.displayName = "ListItem";
