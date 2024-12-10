import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { CalendarDays, CreditCard, PlusCircle, Settings } from "lucide-react";

export default function Component() {
	return (
		<div className=" bg-primary">
			{/* <header className="bg-white dark:bg-gray-800 shadow"> */}
			{/*   <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center"> */}
			{/*     <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Cashwise</h1> */}
			{/*     <nav> */}
			{/*       <Button variant="ghost">Dashboard</Button> */}
			{/*       <Button variant="ghost">Reports</Button> */}
			{/*       <Button variant="ghost">Settings</Button> */}
			{/*     </nav> */}
			{/*   </div> */}
			{/* </header> */}

			<main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-12">
					<h2 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
						Create Your Financial Plan
					</h2>
					<p className="mt-5 max-w-xl mx-auto text-xl text-gray-500 dark:text-gray-300">
						Choose a plan that fits your lifestyle and start managing your money
						like a pro.
					</p>
				</div>

				<div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
					<PlanCard
						title="1 Week Plan"
						description="Perfect for short-term budgeting and weekly expenses tracking."
						icon={<CalendarDays className="h-6 w-6" />}
					/>
					<PlanCard
						title="1 Month Plan"
						description="Ideal for monthly budget planning and bill management."
						icon={<CreditCard className="h-6 w-6" />}
					/>
					<PlanCard
						title="Custom Plan"
						description="Tailor your plan to fit your unique financial goals."
						icon={<Settings className="h-6 w-6" />}
					/>
					<PlanCard
						title="Daily Plan"
						description="For those who want to keep a close eye on daily spending."
						icon={<PlusCircle className="h-6 w-6" />}
					/>
				</div>

				<div className="mt-16 text-center">
					{/* <Button size="lg" className="bg-green-500 hover:bg-green-600 text-white"> */}
					{/*   Create Your Plan */}
					{/* </Button> */}
				</div>
			</main>
		</div>
	);
}

function PlanCard({ title, description, icon }: { title: string; description: string; icon: React.ReactNode }) {
	return (
		<Card className="flex flex-col justify-between">
			<CardHeader>
				<div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-4">
					{icon}
				</div>
				<CardTitle>{title}</CardTitle>
				<CardDescription>{description}</CardDescription>
			</CardHeader>
			<CardContent>
				<Select>
					<SelectTrigger className="w-full">
						<SelectValue placeholder="Select features" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="basic">Basic</SelectItem>
						<SelectItem value="standard">Standard</SelectItem>
						<SelectItem value="premium">Premium</SelectItem>
					</SelectContent>
				</Select>
			</CardContent>
			<CardFooter>
				<Button className="w-full">Choose Plan</Button>
			</CardFooter>
		</Card>
	);
}
