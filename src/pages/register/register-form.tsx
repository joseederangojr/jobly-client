import * as React from "react";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { useAppForm } from "@/components/ui/form";
import { toast } from "sonner";
import {
	register,
	registerSchema,
	type RegisterData,
	type RegisterError,
	type RegisterResult,
} from "@/lib/api/auth";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export const RegisterForm = () => {
	const navigate = useNavigate();
	const registerMutation = useMutation<
		RegisterResult,
		RegisterError,
		RegisterData
	>({
		mutationFn: async (data) => register(data),
	});
	const form = useAppForm({
		defaultValues: {
			name: "",
			email: "",
			password: "",
			passwordConfirmation: "",
			role: "candidate",
		},

		validators: {
			onChange: registerSchema,
		},
		onSubmit({ value, formApi }) {
			registerMutation.mutate(value as RegisterData, {
				onError(error) {
					formApi.setErrorMap({
						onSubmit: {
							fields: {
								email: error.errors.email.map((message) => ({ message })),
							},
						},
					});
					toast.error("Register failed", {
						description: error.message,
					});
				},
				onSuccess(data) {
					toast.success("Register successful", {
						description: "Welcome back to Jobly!",
						duration: 1500,
						onAutoClose: () => navigate("/"),
					});

					window.localStorage.setItem("token", data.accessToken);
					window.localStorage.setItem("expires", data.expiresIn);
				},
			});
		},
	});

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		event.stopPropagation();
		form.handleSubmit();
	};
	return (
		<form onSubmit={handleSubmit} className="space-y-6">
			<form.AppField
				name="name"
				children={(field) => (
					<field.FormInput
						label="Full name"
						name={field.name}
						value={field.state.value}
						placeholder="John Doe"
						type="text"
						className="border-[#e4e2e0] focus-visible:ring-[#2557a7]"
						onChange={(event) => field.handleChange(event.target.value)}
					/>
				)}
			/>
			<form.AppField
				name="email"
				children={(field) => (
					<field.FormInput
						label="Email"
						name={field.name}
						value={field.state.value}
						placeholder="john@doe.com"
						type="email"
						className="border-[#e4e2e0] focus-visible:ring-[#2557a7]"
						onChange={(event) => field.handleChange(event.target.value)}
					/>
				)}
			/>

			<form.AppField
				name="password"
				children={(field) => (
					<field.FormInput
						label="Password"
						name={field.name}
						value={field.state.value}
						onChange={(event) => field.handleChange(event.target.value)}
						placeholder="••••••••"
						type="password"
						className="border-[#e4e2e0] focus-visible:ring-[#2557a7]"
					/>
				)}
			/>

			<form.AppField
				name="passwordConfirmation"
				children={(field) => (
					<field.FormInput
						label="Password Confirmation"
						name={field.name}
						value={field.state.value}
						onChange={(event) => field.handleChange(event.target.value)}
						placeholder="••••••••"
						type="password"
						className="border-[#e4e2e0] focus-visible:ring-[#2557a7]"
					/>
				)}
			/>
			<form.AppField
				name="role"
				children={(field) => (
					<field.FormItem className="space-y-3">
						<field.FormLabel className="text-[#2d2d2d]">
							I want to
						</field.FormLabel>
						<field.FormControl>
							<RadioGroup
								onValueChange={(value) => field.handleChange(value)}
								defaultValue={field.state.value}
								className="flex flex-col space-y-1"
							>
								<field.FormItem className="flex items-center space-x-3 space-y-0">
									<field.FormControl>
										<RadioGroupItem value="candidate" />
									</field.FormControl>
									<field.FormLabel className="font-normal cursor-pointer">
										Find a job (Candidate)
									</field.FormLabel>
								</field.FormItem>
								<field.FormItem className="flex items-center space-x-3 space-y-0">
									<field.FormControl>
										<RadioGroupItem value="employer" />
									</field.FormControl>
									<field.FormLabel className="font-normal cursor-pointer">
										Post jobs (Employer)
									</field.FormLabel>
								</field.FormItem>
							</RadioGroup>
						</field.FormControl>
						<field.FormMessage />
					</field.FormItem>
				)}
			/>
			<form.AppForm>
				<form.FormSubmit>Sign In</form.FormSubmit>
			</form.AppForm>
		</form>
	);
};
