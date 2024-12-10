"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DollarSign, PlusCircle, Trash2, ChevronDown } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogFooter,
	DialogDescription,
} from "@/components/ui/dialog";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSearchParams } from "next/navigation";
import { useCategory } from "@/hooks/useCategory";
import { useEachPlan } from "@/hooks/useEachPlan";
import { z } from "zod";
import { TransactionSchema, CategorySchema } from "@/types";
import { useToast } from "@/hooks/use-toast";

export default function DailyExpenses() {
	const { toast } = useToast();
	// query
	// const { data:plan } = usePlanById();
	//  console.log("plannnn", plan);
	// type
	type transaction = z.infer<typeof TransactionSchema>;
	type category = z.infer<typeof CategorySchema>;
	// const router = useRouter();
	const searchParams = useSearchParams();
	const currentPlanId = searchParams.get("id");

	const { categoriesQuery, createCategoryMutation, deleteCategoryMutation } =
		useCategory();
	const { data: categories } = categoriesQuery();
	console.log("categories", categories);

	const {
		eachPlanQuery,
		createTransactionMutation,
		deleteTransactionMutation,
	} = useEachPlan();
	const { data: plan } = eachPlanQuery();

	const now = new Date();
	const currentHours = now.getHours();
	const currentMinutes = now.getMinutes();
	const currentSeconds = now.getSeconds();
	// useState
	const [isAddingCategory, setIsAddingCategory] = useState(false);
	const [newCategory, setNewCategory] = useState("");
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
	const [categoryToDelete, setCategoryToDelete] = useState<number | null>(null);

	const handleAddCategory = async () => {
		if (newCategory.trim()) {
			try {
				const data = await createCategoryMutation.mutateAsync({
					// planId: currentPlanId,
					newCategory: { name: newCategory },
				});
				if (data.error) {
					toast({
						title: "Category add failed",
						description: `${data.error}`,
					});
				} else {
					toast({
						title: "Category added",
						description: `${data.name} added successfully`,
					});
				}
				setIsAddingCategory(false);
				setNewCategory("");
			} catch (error) {
				console.error("Failed to add category:", error);
			}
		}
	};

	const [newTransaction, setNewTransaction] = useState<transaction>({
		budget_id: 1,
		plan_id: currentPlanId ? parseInt(currentPlanId) : 1,
		description: "",
		amount: 0,
		category_id: 1,
		transaction_date: new Date().toISOString().split("T")[0],
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setNewTransaction((prev) => ({
			...prev,
			[name]:
				name === "amount" || name === "budget_id" || name === "category_id"
					? Number(value) // Convert to number
					: value,
		}));
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const padZero = (num: number) => num.toString().padStart(2, "0");

		const fullISODate = `${new Date(newTransaction.transaction_date).toISOString().split("T")[0]}T${padZero(currentHours)}:${padZero(currentMinutes)}:${padZero(currentSeconds)}Z`;

		try {
			const transaction = TransactionSchema.parse({
				...newTransaction,
				transaction_date: fullISODate,
			});
			createTransactionMutation.mutate({
				planId: currentPlanId,
				// newTransaction: { ...newTransaction, transaction_date: fullISODate },
				newTransaction: transaction,
			});
			setNewTransaction({
				budget_id: 1,
				plan_id: currentPlanId ? parseInt(currentPlanId) : 1,
				description: "",
				amount: 0,
				category_id: 1,
				transaction_date: new Date().toISOString().split("T")[0],
			});
			if (event.target instanceof HTMLFormElement) {
				event.target.reset();
			}
		} catch (error) {
			if (error instanceof z.ZodError) {
				console.error("Validation failed:", error.errors); // Detailed error messages
			}
			console.error("Failed to add transaction:", error);
		}
	};

	const handleDeleteTransaction = async (id: number) => {
		try {
			deleteTransactionMutation.mutate({
				planId: currentPlanId,
				transactionId: id,
			});
		} catch (error) {
			console.error("Failed to delete transaction:", error);
		}
	};

	const handleDeleteCategory = async (categoryId: number) => {
		try {
			deleteCategoryMutation.mutate({ planId: currentPlanId, categoryId });
			toast({
				title: "Category deleted",
				description: `Category deleted successfully`,
			});
			setIsDeleteDialogOpen(false);
			setCategoryToDelete(null);
		} catch (error) {
			console.error("Failed to delete category:", error);
		}
	};

	return (
		<>
			<div className="min-h-screen ">
				<main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
					<div className="px-4 py-6 sm:px-0">
						<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
							<Card className="col-span-1 md:col-span-2">
								<CardHeader>
									<CardTitle>Add New Expense</CardTitle>
									<CardDescription>Track your daily spending</CardDescription>
								</CardHeader>
								<form onSubmit={handleSubmit}>
									<CardContent>
										<div className="space-y-4">
											<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
												<div className="space-y-2">
													<Label htmlFor="category">Category</Label>

													<DropdownMenu>
														<DropdownMenuTrigger asChild>
															<Button
																variant="outline"
																className="w-full justify-between"
															>
																{(Array.isArray(categories) &&
																	categories.find(
																		(c: { id: number }) =>
																			c.id === newTransaction.category_id,
																	)?.name) ||
																	"Select a category"}
																<ChevronDown className="ml-2 h-4 w-4 opacity-50" />
															</Button>
														</DropdownMenuTrigger>
														<DropdownMenuContent className="w-[--radix-dropdown-trigger-width] min-w-[8rem]">
															{Array.isArray(categories) &&
																categories?.map((category: category) => (
																	<DropdownMenuItem
																		key={category.id}
																		onClick={() =>
																			setNewTransaction({
																				...newTransaction,
																				category_id: category.id,
																			})
																		}
																		className="justify-between"
																	>
																		{category?.name}
																		<Button
																			variant="outline"
																			className="h-4 w-4 opacity-50 hover:opacity-100 bg-secondary"
																			onClick={(e) => {
																				e.stopPropagation();
																				setCategoryToDelete(category.id);
																				setIsDeleteDialogOpen(true);
																			}}
																		>
																			X
																		</Button>
																	</DropdownMenuItem>
																))}
															<DropdownMenuItem
																onClick={() => setIsAddingCategory(true)}
																className="justify-center font-medium"
															>
																+ Add new category
															</DropdownMenuItem>
														</DropdownMenuContent>
													</DropdownMenu>
												</div>
												<div className="space-y-2">
													<Label htmlFor="amount">Amount</Label>
													<div className="relative">
														<DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
														<Input
															id="amount"
															name="amount"
															type="number"
															placeholder="0.00"
															className="pl-10"
															required
															value={
																newTransaction.amount === 0
																	? ""
																	: newTransaction.amount
															}
															onChange={(e) =>
																setNewTransaction({
																	...newTransaction,
																	// amount: parseFloat(e.target.value),
																	amount: isNaN(parseFloat(e.target.value))
																		? 0
																		: parseFloat(e.target.value),
																})
															}
														/>
													</div>
												</div>
											</div>
											<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
												<div className="space-y-2">
													<Label htmlFor="description">Description</Label>
													<Input
														id="description"
														placeholder="What did you spend on? (optional)"
														name="description"
														value={newTransaction.description}
														onChange={handleChange}
													/>
												</div>
												<div className="space-y-2">
													<Label htmlFor="transaction_date">Date</Label>
													<Input
														id="transaction_date"
														name="transaction_date"
														type="date"
														value={newTransaction.transaction_date}
														onChange={handleChange}
													/>
												</div>
											</div>
										</div>
									</CardContent>
									<CardFooter>
										{/* <Button className="w-full" onClick={addExpense}> */}
										<Button className="w-full bg-secondary" type="submit">
											<PlusCircle className="mr-2 h-4 w-4" /> Add Expense
										</Button>
									</CardFooter>
								</form>
							</Card>

							<Card>
								<CardHeader>
									<CardTitle>Expense Summary</CardTitle>
									<CardDescription>Your spending at a glance</CardDescription>
								</CardHeader>
								<CardContent>
									<div className="text-2xl font-bold">
										{Array.isArray(plan?.Transactions)
											? plan.Transactions.reduce(
													(sum: number, transaction: { amount: string }) => {
														const amount = parseFloat(transaction.amount) || 0; // Default to 0 if not a valid number
														return sum + amount;
													},
													0,
												).toFixed(2)
											: 0}
									</div>
									<p className="text-sm text-muted-foreground">
										Total Expenses
									</p>
									<div className="mt-4 space-y-2">
										{Array.isArray(categories) &&
											categories?.map(
												(category: { id: number; name: string }) => {
													const categoryTotal = (plan?.Transactions ?? [])
														.filter(
															(transaction: { category_id: number }) =>
																transaction.category_id === category.id,
														)
														.reduce(
															(
																sum: number,
																transaction: { amount: string },
															) => {
																const amount =
																	parseFloat(transaction.amount) || 0;
																return sum + amount;
															},
															0,
														);
													return (
														<div
															key={category.id}
															className="flex justify-between items-center"
														>
															<span className="text-sm">{category.name}</span>
															<span className="text-sm font-medium">
																${categoryTotal?.toFixed(2) ?? 0}
															</span>
														</div>
													);
												},
											)}
									</div>
								</CardContent>
							</Card>
						</div>

						<Card className="mt-6">
							<CardHeader>
								<CardTitle>Recent Expenses</CardTitle>
								<CardDescription>Your latest transactions</CardDescription>
							</CardHeader>
							<CardContent>
								<Tabs defaultValue="all" className="w-full">
									<TabsList>
										<TabsTrigger value="all">All</TabsTrigger>
										<TabsTrigger value="today">Today</TabsTrigger>
										<TabsTrigger value="week">This Week</TabsTrigger>
									</TabsList>
									<TabsContent value="all">
										<ScrollArea className="h-[300px]">
											<div className="space-y-4">
												{(plan?.Transactions ?? []).map(
													(transaction: {
														id: number;
														amount: string;
														description: string;
														category: { name: string };
														transaction_date: string;
													}) => (
														<div
															key={transaction.id}
															className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg shadow"
														>
															<div className="flex items-center space-x-4">
																<div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full">
																	<DollarSign className="h-4 w-4 text-blue-600 dark:text-blue-300" />
																</div>
																<div>
																	<p className="font-medium">
																		{transaction?.category?.name}
																	</p>
																	<p className="text-sm text-gray-500 dark:text-gray-400">
																		{transaction.transaction_date}
																	</p>
																</div>
															</div>
															<div className="flex items-center space-x-4">
																<div className="text-right">
																	<p className="font-medium">
																		{parseFloat(
																			transaction.amount || "0",
																		).toFixed(2)}
																	</p>
																	<p className="text-sm text-gray-500 dark:text-gray-400">
																		{transaction.description}
																	</p>
																</div>
																<Button
																	variant="ghost"
																	size="icon"
																	onClick={() =>
																		handleDeleteTransaction(transaction.id)
																	}
																>
																	<Trash2 className="h-4 w-4 text-red-500" />
																</Button>
															</div>
														</div>
													),
												)}
											</div>
										</ScrollArea>
									</TabsContent>
									<TabsContent value="today">
										<p>Today&apos;s expenses...</p>
									</TabsContent>
									<TabsContent value="week">
										<p>This week&apos;s expenses...</p>
									</TabsContent>
								</Tabs>
							</CardContent>
						</Card>
					</div>
				</main>

				<Dialog
					open={isAddingCategory}
					onOpenChange={setIsAddingCategory}
					aria-labelledby="add-category-title"
					aria-describedby="add-category-description"
				>
					<DialogContent className="sm:max-w-[425px]">
						<DialogHeader>
							<DialogTitle>Add New Category</DialogTitle>
							<DialogDescription>
								Add your own category (e.g., Food, Entertain, Education).
							</DialogDescription>
						</DialogHeader>
						<div className="flex items-center space-x-2">
							<div className="grid flex-1 gap-2">
								<Label
									htmlFor="new-category"
									className="grid flex-1 gap-2 py-2"
								>
									Name
								</Label>
								<Input
									id="new-category"
									value={newCategory}
									onChange={(e) => setNewCategory(e.target.value)}
									required
								/>
							</div>
						</div>
						<DialogFooter>
							<Button
								variant="outline"
								onClick={() => setIsAddingCategory(false)}
							>
								Cancel
							</Button>
							<Button onClick={handleAddCategory} className="bg-secondary">
								Add Category
							</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>

				<Dialog
					open={isDeleteDialogOpen}
					onOpenChange={setIsDeleteDialogOpen}
					aria-labelledby="delete-category-title"
					aria-describedby="delete-category-description"
				>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Delete Category</DialogTitle>
							<DialogDescription>
								Are you sure you want to delete this category? This action
								cannot be undone.
							</DialogDescription>
						</DialogHeader>
						<DialogFooter>
							<Button
								variant="outline"
								onClick={() => setIsDeleteDialogOpen(false)}
							>
								Cancel
							</Button>
							<Button
								variant="destructive"
								onClick={() =>
									categoryToDelete && handleDeleteCategory(categoryToDelete)
								}
							>
								Delete
							</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</div>
		</>
	);
}

