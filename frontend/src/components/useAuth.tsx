'use client'
// src/components/useAuth.tsx
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {jwtDecode} from "jwt-decode";
import Cookies from "js-cookie";

export function useAuth() {
    const router = useRouter();

    useEffect(() => {
        const jwtToken = Cookies.get("jwt"); // Get JWT from cookies

        if (jwtToken) {
            try {
                const decoded = jwtDecode<{ exp: number }>(jwtToken);
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
            router.push("/sign-in");
        }
    }, [router]); // Add router as a dependency

    const handleLogout = () => {
        Cookies.remove("jwt", { path: "/" }); // Clear JWT from cookies
        router.push("/sign-in"); // Redirect to login page
    };
}

// 'use client';
// import { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { jwtDecode } from "jwt-decode";
// import Cookies from "js-cookie";
//
// export function useAuth() {
//     const router = useRouter();
//
//     useEffect(() => {
//         const jwtToken = Cookies.get("jwt"); // Get JWT from cookies
//
//         console.log("JWT Token:", jwtToken); // Debug log for the token
//
//         if (jwtToken) {
//             try {
//                 const decoded = jwtDecode<{ exp: number }>(jwtToken);
//                 const exp = decoded.exp * 1000; // Convert to milliseconds
//                 const currentTime = Date.now();
//
//                 console.log("Decoded Expiration Time:", exp); // Debug log for expiration
//                 console.log("Current Time:", currentTime); // Debug log for current time
//
//                 if (currentTime >= exp) {
//                     console.log("Token expired. Logging out.");
//                     handleLogout();
//                 }
//             } catch (error) {
//                 console.error("Error decoding JWT:", error);
//                 handleLogout();
//             }
//         } else {
//             console.log("No JWT token found. Redirecting to sign-in.");
//             router.push("/sign-in");
//         }
//     }, [router]); // Add router as a dependency
//
//     const handleLogout = () => {
//         console.log("Logging out...");
//         Cookies.remove("jwt", { path: "/" }); // Clear JWT from cookies
//         router.push("/sign-in"); // Redirect to login page
//     };
// }
//
// export default function Page() {
//     useAuth();
//     return <div>hello</div>;
// }
