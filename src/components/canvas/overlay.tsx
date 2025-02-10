export default function Overlay(props: {name: string}) {
	return (
		<div
			className="flex justify-center grow h-6 w-full z-0"
			data-tauri-drag-region
		>
			{props.name}
		</div>
	);
}
