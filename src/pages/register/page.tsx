import * as Auth from "@/components/auth";
import { RegisterForm } from "./register-form";
export default function RegisterPage() {
	return (
		<Auth.Root>
			<Auth.HeaderRoot>
				<Auth.HeaderLogo />
				<Auth.HeaderTitle>Create an account</Auth.HeaderTitle>
				<Auth.HeaderLink text="Already have an account?" to="/login">
					Sign in
				</Auth.HeaderLink>
			</Auth.HeaderRoot>
			<RegisterForm />
			<Auth.Footer />
			<Auth.FooterActions>
				<Auth.AuthWithButton>Google</Auth.AuthWithButton>
				<Auth.AuthWithButton>LinkedIn</Auth.AuthWithButton>
			</Auth.FooterActions>
		</Auth.Root>
	);
}
