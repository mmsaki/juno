import { motion } from "framer-motion";
import { useState } from "react";
import Stepper, { Step } from "./Stepper";

export default function ERC20Form() {
	const [name, setName] = useState("");
	const [ticker, setTicker] = useState("");
	const [uri, setURI] = useState("");
	return (
		<motion.form
			className=""
			whileInView={{ opacity: 1 }}
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
					<h2>Welcome to token launch!</h2>
					<p>Go next.</p>
				</Step>
				<Step>
					<h2>What's the name of your token?</h2>
					<input
						value={name}
						onChange={(e) => setName(e.target.value)}
						placeholder="Token name?"
						required
						className="w-full font-bold mb-1 pl-2.5 py-1 focus:outline-0 focus-within:font-normal border-l-1 border-l-gray-300"
					/>
				</Step>
				<Step>
					<h2>What's the ticker?</h2>
					<input
						value={ticker}
						onChange={(e) => setTicker(e.target.value)}
						placeholder="Your $TICKER?"
						required
						className="w-full font-bold mb-1 pl-2.5 py-1 focus:outline-0 focus-within:font-normal border-l-1 border-l-gray-300"
					/>
				</Step>
				<Step>
					<h2>What's the uri image?</h2>
					<input
						value={uri}
						onChange={(e) => setURI(e.target.value)}
						placeholder="Your uri image?"
						required
						className="w-full font-bold mb-1 pl-2.5 py-1 focus:outline-0 focus-within:font-normal border-l-1 border-l-gray-300"
					/>
				</Step>
				<Step>
					<h2>Final Step</h2>
					<p>You made it! 🎉</p>
				</Step>
			</Stepper>
		</motion.form>
	);
}
