import { invoke } from "@tauri-apps/api/core";
import { useState } from "react";
import { Button } from "./Button";
import { motion } from "framer-motion";
import Stepper, { Step } from "./Stepper";

export default function TheGraphFrom() {
	const [greetMsg, setGreetMsg] = useState("");
	const [num, setNum] = useState("");
	const [uniswapVersion, setUniswapVerion] = useState("v4");
	async function getPoolData() {
		// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
		if (window === undefined) return;
		setGreetMsg(
			JSON.stringify(
				await invoke("tokens", {
					num: num,
					version: uniswapVersion,
				}),
				null,
				4,
			),
		);
	}
	return (
		<div>
			<motion.form
				className=""
				whileInView={{ opacity: 1 }}
				layout
				onSubmit={(e) => {
					e.preventDefault();
					getPoolData();
				}}
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
						<h2>Welcomes, get token data for any Uniswap pool!</h2>
						<p>Go next</p>
					</Step>
					<Step>
						<h2>Which version of Uniswap?</h2>
						<fieldset className="grid">
							<div className="flex items-center gap-1">
								<label htmlFor="v3" className="flex items-center gap-1">
									<input
										id="v3"
										name="version"
										type="radio"
										className="peer hidden"
										value="v3"
										onChange={(e) => {
											setUniswapVerion(e.target.value);
											console.log("Selected:", uniswapVersion);
										}}
									/>
									<div className="w-4 h-4 rounded-full border-1 border-gray-400 peer-checked:bg-gray-800 transition"></div>
									<p>V3</p>
								</label>
							</div>
							<div className="flex items-center gap-1">
								<label htmlFor="v4" className="flex items-center gap-1">
									<input
										id="v4"
										name="version"
										type="radio"
										className="peer hidden"
										value="v4"
										onChange={(e) => {
											setUniswapVerion(e.target.value);
											console.log("Selected:", uniswapVersion);
										}}
									/>
									<div className="w-4 h-4 rounded-full border-1 border-gray-400 peer-checked:bg-gray-800 transition"></div>
									<p>V4</p>
								</label>
							</div>
						</fieldset>
					</Step>
					<Step>
						<h2>How much data do you want?</h2>
						<label>
							<input
								className="bg-gray-100 rounded-md mb-1 font-bold focus:outline-0 focus:font-normal"
								id="greet-input"
								type="number"
								onChange={(e) => setNum(e.currentTarget.value)}
								placeholder="Num"
								min="1"
								max="1000"
							/>
						</label>
					</Step>
					<Step>
						<h2>Final Step</h2>
						<p>You made it! 🎉</p>
					</Step>
				</Stepper>
			</motion.form>
			<p className="overflow-auto text-blue-500">{greetMsg}</p>
		</div>
	);
}
