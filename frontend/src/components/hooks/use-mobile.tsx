// import { useState, useEffect } from "react";
//
// // const useWindowSize = () => {
// export const useIsMobile = () => {
// 	const [windowSize, setWindowSize] = useState({
// 		width: typeof window !== "undefined" ? window.innerWidth : null,
// 		height: typeof window !== "undefined" ? window.innerHeight : null,
// 	});
//
// 	useEffect(() => {
// 		const handleResize = () => {
// 			setWindowSize({
// 				width: window.innerWidth,
// 				height: window.innerHeight,
// 			});
// 		};
//
// 		window.addEventListener("resize", handleResize);
// 		handleResize();
//
// 		return () => window.removeEventListener("resize", handleResize);
// 	}, []);
//
// 	return windowSize;
// };

import { useEffect, useState } from "react";

export const useIsMobile = () => {
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const checkMobile = () => setIsMobile(window.innerWidth <= 768);
		checkMobile();
		window.addEventListener("resize", checkMobile);
		return () => window.removeEventListener("resize", checkMobile);
	}, []);

	return isMobile;
};
