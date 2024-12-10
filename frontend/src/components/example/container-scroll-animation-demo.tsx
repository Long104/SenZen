"use client";
import React from "react";
import { ContainerScroll } from "../ui/container-scroll-animation";
import Image from "next/image";

export function HeroScrollDemo() {
	return (
		<div className="flex flex-col overflow-hidden">
			<ContainerScroll
				titleComponent={
					<>
						<h1 className="text-4xl font-semibold text-black dark:text-white">
							Minimize your Financial <br />
							<span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
								100%
							</span>
						</h1>
					</>
				}
			>
				<Image
					src={'/money.avif'}
					alt="hero"
					height={720}
					width={1400}
					className="mx-auto rounded-2xl object-cover h-full object-center"
					draggable={false}
				/>
			</ContainerScroll>
		</div>
	);
}
