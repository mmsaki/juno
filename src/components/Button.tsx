export interface ButtonProps {
	/** Is this the principal call to action on the page? */
	primary?: boolean;
	/** What background color to use */
	backgroundColor?: string;
	/** How large should the button be? */
	size?: "sm" | "md" | "lg";
	/** Button contents */
	label: string;
	/** Optional click handler */
	onClick?: () => void;
}

/** Primary UI component for user interaction */
export const Button = ({
	primary = false,
	size = "md",
	backgroundColor,
	label,
	...props
}: ButtonProps) => {
	const mode = primary ? "" : "";
	return (
		<button
			type="button"
			className={["flex text-nowrap flex-none hover:underline", ``, mode].join(" ")}
			style={{ backgroundColor }}
			{...props}
		>
			[{label}]
		</button>
	);
};
