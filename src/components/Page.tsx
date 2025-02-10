import React from "react";

import Canvas from "./canvas/canvas";
import CanvasLeft from "./canvas/canvas-left";
import CanvasRight from "./canvas/canvas-right";

export const Page: React.FC = () => {
	const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
	return (
		<div className="flex h-[calc(100vh-24px)]">
			{!isIOS && <CanvasLeft />}
			<Canvas />
			{!isIOS &&<CanvasRight />}
		</div>
	);
};
