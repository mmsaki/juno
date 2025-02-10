export default function Overlay(props: { title: string }) {
	return (
		<div
			className="flex justify-center grow h-6 w-full z-0"
			data-tauri-drag-region
		>
			{props.title}
		</div>
	);
}
