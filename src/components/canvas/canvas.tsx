import ERC20Form from "../ERC20Form";
import Overlay from "../Overlay";
import TheGraphFrom from "../TheGraphForm";

export default function Canvas() {
	return (
		<section className="w-full">
			<Overlay />
			<div className="h-full overflow-hidden overflow-y-auto">
				<h1 className="font-black text-2xl">Launch Token</h1>
				<p>Launch a ERC20 token to use as collateral on Uniswap V4.</p>
				<ERC20Form />
				<h2 className="font-black text-xl">The Graph Pools/Hook data</h2>
				<p>Collect data from TheGraph on Uniswap protocol Uniswap V4.</p>
				<TheGraphFrom />
			</div>
		</section>
	);
}
