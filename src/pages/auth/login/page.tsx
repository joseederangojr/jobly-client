import * as Auth from "@/pages/auth/auth";
import { LoginForm } from "./login-form";

export default function LoginPage() {
	return (
		<Auth.Root>
			<Auth.HeaderRoot>
				<Auth.HeaderLogo />
				<Auth.HeaderTitle>Sign in to Jobly</Auth.HeaderTitle>
				<Auth.HeaderLink text="Or" to="/register">
					create a new account
				</Auth.HeaderLink>
			</Auth.HeaderRoot>
			<LoginForm />
			<Auth.Footer />

			<Auth.FooterActions>
				<Auth.AuthWithButton>Google</Auth.AuthWithButton>
				<Auth.AuthWithButton>LinkedIn</Auth.AuthWithButton>
			</Auth.FooterActions>
		</Auth.Root>
	);
}
