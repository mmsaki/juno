import ERC20Form from "../ERC20Form";
import Overlay from "./overlay";
import TheGraphFrom from "../TheGraphForm";

export default function Canvas() {
	return (
		<section className="w-full">
			<Overlay title="Juno Liquidity Manager" />
			<div className="border-t h-full overflow-hidden overflow-y-auto">
				<h1 className="font-black text-2xl">Launch Token</h1>
				<p>Launch an ERC20 token</p>
				<ERC20Form />
				<h2 className="font-black text-xl">The Graph Pools/Hook data</h2>
				<p>Collect data from TheGraph</p>
				<TheGraphFrom />
			</div>
		</section>
	);
}
