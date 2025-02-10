import React from "react";

import Canvas from "./canvas/canvas";
import CanvasLeft from "./canvas/canvas-left";
import CanvasRight from "./canvas/canvas-right";

export const Page: React.FC = () => {
	return (
		<div className="flex h-[calc(100vh-24px)]">
			<CanvasLeft />
			<Canvas />
			<CanvasRight />
		</div>
	);
};
