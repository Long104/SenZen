import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";

export async function middleware(req: NextRequest) {
	const token = req.cookies.get("jwt");

	const handleLogout = async () => {
		try {
			await fetch(process.env.NEXT_PUBIC_BACKEND + "/logout", {
				method: "POST",
				credentials: "include",
			});
			return NextResponse.redirect(new URL("/sign-in", req.url));
		} catch (error) {
			console.error("Logout error:", error);
			return NextResponse.redirect(new URL("/sign-in", req.url));
		}
	};

	if (token) {
		try {
			// if (req.nextUrl.pathname === "/" && token) {
			// 	return NextResponse.redirect("http://localhost:3000/home");
			// }
			// if (req.nextUrl.pathname === "/sign-in" && token) {
			// 	return NextResponse.redirect("http://localhost:3000/home");
			// }
			const path = req.nextUrl.pathname.replace(/\/+$/, ""); // Remove trailing slashes

			const redirectToHome = ["", "/sign-in", "/sign-up"]; // Adjust for root path ""

			if (redirectToHome.includes(path) && token) {
				// return NextResponse.redirect("http://localhost:3000/home");
				return NextResponse.redirect(new URL("/home", req.url));
			}

			const decoded = jwtDecode<{ exp: number }>(token.value); // Decode the token
			const exp = decoded.exp * 1000; // Convert to milliseconds
			const currentTime = Date.now();

			if (currentTime >= exp) {
				return await handleLogout(); // Logout if expired
			}

			// Validate the token with your backend
			// const response = await fetch(
			// 	process.env.NEXT_PUBLIC_BACKEND + "/validate-token",
			// 	{
			// 		headers: { Authorization: `Bearer ${token.value}` },
			// 	},
			// );

			// if (!response.ok) {
			// 	return await handleLogout(); // Logout if token is not valid
			// }
		} catch (error) {
			console.error("Error decoding JWT:", error);
			return await handleLogout(); // Logout on decoding error
		}
	} else {
		const path = req.nextUrl.pathname.replace(/\/+$/, ""); // Remove trailing slashes
		const redirectToHome = ["", "/sign-in", "/sign-up"]; // Adjust for root path ""
		if (!redirectToHome.includes(path)) {
			console.error("JWT token is not available.");
			return NextResponse.redirect(new URL("/sign-in", req.url));
		}
	}

	// return NextResponse.next(); // Continue to the requested route

	return NextResponse.next({
		// request: {
		// 	// Apply new request headers
		// 	headers: requestHeaders,
		// },
	});
}

export const config = {
	matcher: [
		"/dashboard",
		"/createPlan",
		"/",
		"/sign-in",
		"/sign-up",
		"/((?!.*\\..*|_next).*)",
		// "/(api|trpc)(.*)"
	], // Apply middleware to `/home`, `/dashboard`, etc.
};
