import Overlay from "../Overlay";

export default function CanvasRight() {
	return (
		<section className="min-w-64">
			<Overlay />
			<div className="bg-gray-300 row-start-2 row-span-full h-full w-full"></div>
		</section>
	);
}
