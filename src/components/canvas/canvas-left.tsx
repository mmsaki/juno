import React from "react";
import { Header } from "../Header";
import Overlay from "../Overlay";

export interface CanvasProps {}

type User = {
	name: string;
};

export default function CanvasLeft({}: CanvasProps) {
	const [user, setUser] = React.useState<User>();
	return (
		<section className="min-w-64">
			<div className="flex grow">
				<Overlay />
				<Header
					user={user}
					onLogin={() => setUser({ name: "Jane Doe" })}
					onLogout={() => setUser(undefined)}
					onCreateAccount={() => setUser({ name: "Jane Doe" })}
				/>
			</div>
			<div className="border bg-gray-300 w-full h-full"></div>
		</section>
	);
}
