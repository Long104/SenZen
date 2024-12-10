"use server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
// import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const handleLogout = async () => {
	try {
		await fetch(process.env.NEXT_PUBLIC_BACKEND + "/logout", {
			method: "POST", // or "GET" depending on your server implementation
			credentials: "include", // Include cookies in the request
		});
		// Optionally, clear JWT cookie here as well
		// Cookies.remove("jwt", { path: "/" });
		redirect("/sign-in");
	} catch (error) {
		console.error("Logout error:", error);
	}
};
export async function useAuth() {
	const cookieStore = await cookies();
	const jwtToken = cookieStore.get("jwt");
	// let decoded;
	if (jwtToken) {
		try {
			// if (jwtToken) {
			const decoded = jwtDecode<{ exp: number }>(jwtToken.value); // Define the expected structure
			// } else {
			// 	console.error("JWT token is not available.");
			// 	return <div>No JWT found</div>; // or redirect to login, etc.
			// }
			const exp = decoded.exp * 1000; // Convert to milliseconds
			const currentTime = Date.now();

			if (currentTime >= exp) {
				handleLogout();
			}
		} catch (error) {
			console.error("Error decoding JWT:", error);
			handleLogout();
		}
	} else {
		redirect("/sign-in");
	}
}
