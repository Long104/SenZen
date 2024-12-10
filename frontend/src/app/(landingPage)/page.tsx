import { SpotlightPreview } from "@example/spotlight-demo";
import { TimelineDemo } from "@example/timeline-demo";
import { Footer } from "@example/footer";
import { InfiniteMovingCardsDemo } from "@example/infinite-moving-cards-demo";
import Try from "@example/try-landing";
import Try2 from "@example/try2-landing";
export default function Home() {
	return (
		<>
			{/* <div className="[&_*]:overscroll-none"> */}
			<SpotlightPreview />
			<TimelineDemo />
			<Try2 />
			<InfiniteMovingCardsDemo />
			<Try />
			<Footer />
			{/* </div> */}
		</>
	);
}
