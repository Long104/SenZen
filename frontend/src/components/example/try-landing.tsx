import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	BarChart3,
	CreditCard,
	DollarSign,
	Lock,
	PieChart,
	Smartphone,
	Wallet,
} from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {
	return (
		<div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 dark:from-black dark:to-slate-800">
			<main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-16">
					<h2 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl">
						Manage Your Money Smarter
					</h2>
					<p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
						Take control of your finances with our intelligent money management
						platform.
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					<FeatureCard
						icon={<PieChart className="h-8 w-8 text-green-500" />}
						title="Budget Tracking"
						description="Easily create and manage budgets for different expense categories."
					/>
					<FeatureCard
						icon={<BarChart3 className="h-8 w-8 text-blue-500" />}
						title="Expense Analytics"
						description="Gain insights into your spending habits with detailed analytics and reports."
					/>
					<FeatureCard
						icon={<Wallet className="h-8 w-8 text-purple-500" />}
						title="Savings Goals"
						description="Set and track savings goals for your future plans and dreams."
					/>
					<FeatureCard
						icon={<CreditCard className="h-8 w-8 text-red-500" />}
						title="Bill Reminders"
						description="Never miss a payment with automated bill reminders and tracking."
					/>
					<FeatureCard
						icon={<Smartphone className="h-8 w-8 text-indigo-500" />}
						title="Mobile App"
						description="Access your financial data on-the-go with our user-friendly mobile app."
					/>
					<FeatureCard
						icon={<Lock className="h-8 w-8 text-gray-500" />}
						title="Bank-Level Security"
						description="Rest easy knowing your financial data is protected with top-tier security measures."
					/>
				</div>

				<div className="mt-20">
					<h3 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
						What Our Users Say
					</h3>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						<TestimonialCard
							name="Alex Johnson"
							role="Small Business Owner"
							content="MoneyWise has transformed how I manage my business finances. The insights are invaluable!"
						/>
						<TestimonialCard
							name="Sarah Lee"
							role="Freelance Designer"
							content="As a freelancer, tracking expenses was a nightmare. MoneyWise made it simple and stress-free."
						/>
						<TestimonialCard
							name="Michael Chen"
							role="Recent Graduate"
							content="I&apos;ve finally got my student loans under control thanks to MoneyWise&apos;s budgeting tools."
						/>
					</div>
				</div>

				<div className="mt-20 text-center">
					<h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
						Ready to Take Control of Your Finances?
					</h3>
					<Link href="/sign-in">
						<Button size="lg" className="mt-4">
							Get Started for Free
							<DollarSign className="ml-2 h-5 w-5" />
						</Button>
					</Link>
				</div>
			</main>
		</div>
	);
}

function FeatureCard({
	icon,
	title,
	description,
}: { icon: React.ReactNode; title: string; description: string }) {
	return (
		<Card>
			<CardHeader>
				<div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-100 dark:bg-green-900 mb-4">
					{icon}
				</div>
				<CardTitle>{title}</CardTitle>
			</CardHeader>
			<CardContent>
				<p className="text-gray-600 dark:text-gray-300">{description}</p>
			</CardContent>
		</Card>
	);
}

function TestimonialCard({
	name,
	role,
	content,
}: { name: string; role: string; content: string }) {
	return (
		<Card>
			<CardContent className="pt-6">
				<div className="flex items-center mb-4">
					<Avatar className="h-10 w-10 mr-4">
						<AvatarImage src={`/money.avif`} alt={name} />
						<AvatarFallback>{name[0]}</AvatarFallback>
					</Avatar>
					<div>
						<p className="font-semibold text-gray-900 dark:text-white">
							{name}
						</p>
						<p className="text-sm text-gray-600 dark:text-gray-400">{role}</p>
					</div>
				</div>
				<p className="text-gray-600 dark:text-gray-300 italic">"{content}"</p>
			</CardContent>
		</Card>
	);
}
