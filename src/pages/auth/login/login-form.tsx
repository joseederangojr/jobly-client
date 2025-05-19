import { useAppForm } from "@/components/ui/form";
import {
	type LoginData,
	type LoginError,
	type LoginResult,
	login,
	loginSchema,
} from "@/lib/api/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type * as React from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export const LoginForm = () => {
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const loginMutation = useMutation<LoginResult, LoginError, LoginData>({
		mutationFn: async (data) => login(data),
	});
	const form = useAppForm({
		defaultValues: {
			email: "",
			password: "",
		},

		validators: {
			onChange: loginSchema,
		},
		onSubmit({ value, formApi }) {
			loginMutation.mutate(value, {
				onError(error) {
					formApi.setErrorMap({
						onSubmit: {
							fields: {
								email: error.errors.email.map((message) => ({ message })),
							},
						},
					});
					toast.error("Login failed", {
						description: error.message,
					});
				},
				onSuccess(data) {
					toast.success("Login successful", {
						description: "Welcome back to Jobly!",
						duration: 1500,
						onAutoClose: () => navigate("/"),
					});

					window.localStorage.setItem("token", data.accessToken);
					window.localStorage.setItem("expires", data.expiresIn);

					queryClient.invalidateQueries({
						queryKey: ["me"],
					});
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
				name="email"
				children={(field) => (
					<field.FormInput
						label="Email"
						name={field.name}
						value={field.state.value}
						placeholder="you@example.com"
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
			<form.AppForm>
				<form.FormSubmit>Sign In</form.FormSubmit>
			</form.AppForm>
		</form>
	);
};
