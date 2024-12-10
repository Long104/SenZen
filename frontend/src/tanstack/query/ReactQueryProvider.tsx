// src/app/providers/ReactQueryProvider.tsx
"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { PropsWithChildren } from "react";

// Create a new QueryClient instance
const queryClient = new QueryClient();

export default function ReactQueryProvider({ children }: PropsWithChildren) {
	return (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	);
}
