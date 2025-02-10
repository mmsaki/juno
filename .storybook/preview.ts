import type { Preview } from "@storybook/react";
import "../src/App.css";

/** @type { import('@storybook/react').Preview } */
const preview: Preview = {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
	},
};

export default preview;
