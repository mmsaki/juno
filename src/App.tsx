import React, { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";

function App() {
	const [greetMsg, setGreetMsg] = useState("");
	const [num, setNum] = useState("");
	const [uniswapVersion, setUniswapVerion] = useState("v4");

	async function greet() {
		// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
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

	const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setUniswapVerion(event.target.value);
		console.log("Selected:", event.target.value);
	};
	return (
		<main className="container font-mono">
			<p>Tauri + React + Typescript + Tailwindcss + The Graph</p>

			<form
				className="grid place-items-start"
				onSubmit={(e) => {
					e.preventDefault();
					greet();
				}}
			>
				<label>
					Uniswap Version :{" "}
					<select
						className="bg-gray-100 rounded-md"
						value={uniswapVersion}
						onChange={handleChange}
					>
						<option value="v3">v3</option>
						<option value="v4">v4</option>
					</select>
				</label>

				<label>
					Enter data length :{" "}
					<input
						className="bg-gray-100 rounded-md"
						id="greet-input"
						type="number"
						onChange={(e) => setNum(e.currentTarget.value)}
						placeholder="Num"
						min="1"
						max="1000"
					/>
				</label>
				<button className="grid underline underline-offset-4" type="submit">
					Get Data
				</button>
			</form>
			<p className="text-amber-500">(add .env file in src-tauri)</p>
			<p className="overflow-auto text-blue-500">{greetMsg}</p>
		</main>
	);
}

export default App;
