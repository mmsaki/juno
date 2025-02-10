import React, { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";
import { Button } from "./components/Button";
import { Header } from "./components/Header";
import { Profile } from "./components/profile";
import { ConnectKitButton } from "connectkit";
import ERC20Form from "./components/ERC20Form";
import { Page } from "./components/Page";

function App() {
	return (
		<main className="font-mono">
			<Page />
		</main>
	);
}

export default App;
