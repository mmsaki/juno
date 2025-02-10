import { Button } from "./Button";
import { usePrivy } from "@privy-io/react-auth";

type User = {
	name: string;
};

export interface HeaderProps {
	user?: User;
	onLogin?: () => void;
	onLogout?: () => void;
	onCreateAccount?: () => void;
}

export const Header = ({
	user,
	onLogin,
	onLogout,
	onCreateAccount,
}: HeaderProps) => {
	const { login } = usePrivy();
	return (
		<header>
			<div className="h-4 justify-between align-middle">
				{user ? (
					<div className="space-x-1">
						<div className="flex flex-nowrap text-nowrap">
							Welcome, {user.name}!
						</div>
						<Button size="sm" onClick={onLogout} label="Logout" />
					</div>
				) : (
					<div className="grid space-x-1">
						<Button size="sm" onClick={onLogin} label="Login" />
						<Button
							primary
							size="sm"
							onClick={onCreateAccount}
							label="Signup"
						/>
					</div>
				)}
			</div>
		</header>
	);
};
