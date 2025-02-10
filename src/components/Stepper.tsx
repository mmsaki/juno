import React, {
	useState,
	Children,
	useRef,
	useLayoutEffect,
	HTMLAttributes,
	ReactNode,
} from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";

// import "./Stepper.css";

interface StepperProps extends HTMLAttributes<HTMLDivElement> {
	children: ReactNode;
	initialStep?: number;
	onStepChange?: (step: number) => void;
	onFinalStepCompleted?: () => void;
	stepCircleContainerClassName?: string;
	stepContainerClassName?: string;
	contentClassName?: string;
	footerClassName?: string;
	backButtonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
	nextButtonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
	backButtonText?: string;
	nextButtonText?: string;
	disableStepIndicators?: boolean;
	renderStepIndicator?: (props: RenderStepIndicatorProps) => ReactNode;
}

interface RenderStepIndicatorProps {
	step: number;
	currentStep: number;
	onStepClick: (clicked: number) => void;
}

export default function Stepper({
	children,
	initialStep = 1,
	onStepChange = () => {},
	onFinalStepCompleted = () => {},
	backButtonProps = {},
	nextButtonProps = {},
	backButtonText = "Back",
	nextButtonText = "Continue",
	disableStepIndicators = false,
	renderStepIndicator,
	...rest
}: StepperProps) {
	const [currentStep, setCurrentStep] = useState<number>(initialStep);
	const [direction, setDirection] = useState<number>(0);
	const stepsArray = Children.toArray(children);
	const totalSteps = stepsArray.length;
	const isCompleted = currentStep > totalSteps;
	const isLastStep = currentStep === totalSteps;

	const updateStep = (newStep: number) => {
		setCurrentStep(newStep);
		if (newStep > totalSteps) {
			onFinalStepCompleted();
		} else {
			onStepChange(newStep);
		}
	};

	const handleBack = () => {
		if (currentStep > 1) {
			setDirection(-1);
			updateStep(currentStep - 1);
		}
	};

	const handleNext = () => {
		if (!isLastStep) {
			setDirection(1);
			updateStep(currentStep + 1);
		}
	};

	const handleComplete = () => {
		setDirection(1);
		updateStep(totalSteps + 1);
	};

	return (
		<div className="p-1" {...rest}>
			<div className={`w-96 rounded-xl`} style={{ border: "1px solid #ccc" }}>
				<div className={`flex w-full align-middle p-2`}>
					{stepsArray.map((_, index) => {
						const stepNumber = index + 1;
						const isNotLastStep = index < totalSteps - 1;
						return (
							<React.Fragment key={stepNumber}>
								{renderStepIndicator ? (
									renderStepIndicator({
										step: stepNumber,
										currentStep,
										onStepClick: (clicked) => {
											setDirection(clicked > currentStep ? 1 : -1);
											updateStep(clicked);
										},
									})
								) : (
									<StepIndicator
										step={stepNumber}
										disableStepIndicators={disableStepIndicators}
										currentStep={currentStep}
										onClickStep={(clicked) => {
											setDirection(clicked > currentStep ? 1 : -1);
											updateStep(clicked);
										}}
									/>
								)}
								{isNotLastStep && (
									<StepConnector isComplete={currentStep > stepNumber} />
								)}
							</React.Fragment>
						);
					})}
				</div>

				<StepContentWrapper
					isCompleted={isCompleted}
					currentStep={currentStep}
					direction={direction}
					className={`relative overflow-hidden`}
				>
					{stepsArray[currentStep - 1]}
				</StepContentWrapper>

				{!isCompleted && (
					<div className={`px-2 pb-2`}>
						<div className={`flex mt-1 flex-row-reverse`}>
							<button
								onClick={isLastStep ? handleComplete : handleNext}
								className="transition-all"
								{...nextButtonProps}
								type={stepsArray.length == currentStep ? "submit" : "button"}
							>
								{isLastStep ? "Complete" : nextButtonText}
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

interface StepContentWrapperProps {
	isCompleted: boolean;
	currentStep: number;
	direction: number;
	children: ReactNode;
	className?: string;
}

function StepContentWrapper({
	isCompleted,
	currentStep,
	direction,
	children,
	className,
}: StepContentWrapperProps) {
	const [parentHeight, setParentHeight] = useState<number>(0);

	return (
		<motion.div
			className={className}
			style={{ position: "relative", overflow: "hidden" }}
			animate={{ height: isCompleted ? 0 : parentHeight }}
			transition={{ type: "spring", duration: 0.4 }}
		>
			<AnimatePresence initial={false} mode="sync" custom={direction}>
				{!isCompleted && (
					<SlideTransition
						key={currentStep}
						direction={direction}
						onHeightReady={(h) => setParentHeight(h)}
					>
						{children}
					</SlideTransition>
				)}
			</AnimatePresence>
		</motion.div>
	);
}

interface SlideTransitionProps {
	children: ReactNode;
	direction: number;
	onHeightReady: (h: number) => void;
}

function SlideTransition({
	children,
	direction,
	onHeightReady,
}: SlideTransitionProps) {
	const containerRef = useRef<HTMLDivElement | null>(null);

	useLayoutEffect(() => {
		if (containerRef.current) {
			onHeightReady(containerRef.current.offsetHeight);
		}
	}, [children, onHeightReady]);

	return (
		<motion.div
			ref={containerRef}
			custom={direction}
			variants={stepVariants}
			initial="enter"
			animate="center"
			exit="exit"
			transition={{ duration: 0.4 }}
			style={{ position: "absolute", left: 0, right: 0, top: 0 }}
		>
			{children}
		</motion.div>
	);
}

const stepVariants: Variants = {
	enter: (dir: number) => ({
		y: dir >= 0 ? "-100%" : "100%",
		opacity: 0,
	}),
	center: {
		y: "0%",
		opacity: 1,
	},
	exit: (dir: number) => ({
		y: dir >= 0 ? "50%" : "-50%",
		opacity: 0,
	}),
};

interface StepProps {
	children: ReactNode;
}

export function Step({ children }: StepProps): JSX.Element {
	return <div className="px-2">{children}</div>;
}

interface StepIndicatorProps {
	step: number;
	currentStep: number;
	onClickStep: (step: number) => void;
	disableStepIndicators?: boolean;
}

function StepIndicator({
	step,
	currentStep,
	onClickStep,
	disableStepIndicators,
}: StepIndicatorProps) {
	const status =
		currentStep === step
			? "active"
			: currentStep < step
				? "inactive"
				: "complete";

	const handleClick = () => {
		if (step !== currentStep && !disableStepIndicators) {
			onClickStep(step);
		}
	};

	return (
		<motion.div
			onClick={handleClick}
			className="cursor-pointer relative"
			animate={status}
			initial={false}
		>
			<motion.div
				variants={{
					inactive: { scale: 1, backgroundColor: "#ddd", color: "#888" },
					active: { scale: 1, backgroundColor: "#333", color: "#fff" },
					complete: { scale: 1, backgroundColor: "#333", color: "#fff" },
				}}
				transition={{ duration: 0.3 }}
				className="flex h-6 w-6 items-center justify-center rounded-full font-medium"
			>
				{status === "complete" ? (
					<CheckIcon className="h-4 w-4" />
				) : status === "active" ? (
					<div className="h-2 w-2 rounded-full bg-gray-100" />
				) : (
					<span className="text-sm">{step}</span>
				)}
			</motion.div>
		</motion.div>
	);
}

interface StepConnectorProps {
	isComplete: boolean;
}

function StepConnector({ isComplete }: StepConnectorProps) {
	const lineVariants: Variants = {
		incomplete: { width: 0, backgroundColor: "#444" },
		complete: { width: "100%", backgroundColor: "#444" },
	};

	return (
		<div className="relative overflow-hidden flex-1 self-center mx-1 h-0.5 rounded-sm bg-gray-300">
			<motion.div
				className="absolute top-0 left-0 h-full"
				variants={lineVariants}
				initial={false}
				animate={isComplete ? "complete" : "incomplete"}
				transition={{ duration: 0.4 }}
			/>
		</div>
	);
}

interface CheckIconProps extends React.SVGProps<SVGSVGElement> {}

function CheckIcon(props: CheckIconProps) {
	return (
		<svg
			{...props}
			fill="none"
			stroke="currentColor"
			strokeWidth={2}
			viewBox="0 0 24 24"
		>
			<motion.path
				initial={{ pathLength: 0 }}
				animate={{ pathLength: 1 }}
				transition={{
					delay: 0.1,
					type: "tween",
					ease: "easeOut",
					duration: 0.3,
				}}
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M5 13l4 4L19 7"
			/>
		</svg>
	);
}
