import { motion } from "framer-motion";
import Stepper, { Step } from "./Stepper";
import { useState } from "react";

export default function StepperForm() {
	const [name, setName] = useState("");
	return (
		<motion.form
			className=""
			// Fade in when the element enters the viewport:
			whileInView={{ opacity: 1 }}
			// Animate the component when its layout changes:
			layout
			onSubmit={(e) => e.preventDefault()}
		>
			<Stepper
				initialStep={1}
				onStepChange={(step) => {
					console.log(step);
				}}
				onFinalStepCompleted={() => console.log("All steps completed!")}
				backButtonText="Previous"
				nextButtonText="Next"
			>
				<Step>
					<h2>Welcome to the React Bits stepper!</h2>
					<p>Check out the next step!</p>
				</Step>
				<Step>
					<h2>Step 2</h2>
					<p>Custom step content!</p>
				</Step>
				<Step>
					<h2>How about an input?</h2>
					<input
						value={name}
						onChange={(e) => setName(e.target.value)}
						placeholder="Your name?"
						required
					/>
				</Step>
				<Step>
					<h2>Final Step</h2>
					<p>You made it!</p>
				</Step>
			</Stepper>
		</motion.form>
	);
}
