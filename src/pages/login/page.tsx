import * as React from "react";
import { Link, useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { useAppForm } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { Briefcase, Loader2 } from "lucide-react";
import {
	login,
	loginSchema,
	type LoginData,
	type LoginError,
	type LoginResult,
} from "@/lib/api/auth";

export default function LoginPage() {
	const navigate = useNavigate();
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
		<div className="min-h-screen bg-[#f3f2f1] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-sm border border-gray-200">
				<div className="text-center">
					<div className="flex justify-center">
						<div className="bg-[#2557a7] p-3 rounded-full">
							<Briefcase className="h-8 w-8 text-white" />
						</div>
					</div>
					<h2 className="mt-4 text-3xl font-bold text-[#2d2d2d]">
						Sign in to Jobly
					</h2>
					<p className="mt-2 text-sm text-[#595959]">
						Or{" "}
						<Link
							to="/auth/signup"
							className="font-medium text-[#2557a7] hover:text-[#1f4b8f]"
						>
							create a new account
						</Link>
					</p>
				</div>

				<form onSubmit={handleSubmit} className="space-y-6">
					<form.AppField
						name="email"
						children={(field) => (
							<field.FormItem>
								<field.FormLabel className="text-[#2d2d2d]">
									Email address
								</field.FormLabel>
								<field.FormControl>
									<Input
										name={field.name}
										value={field.state.value}
										placeholder="you@example.com"
										type="email"
										className="border-[#e4e2e0] focus-visible:ring-[#2557a7]"
										onChange={(event) => field.handleChange(event.target.value)}
									/>
								</field.FormControl>
								<field.FormMessage />
							</field.FormItem>
						)}
					/>

					<form.AppField
						name="password"
						children={(field) => (
							<field.FormItem>
								<div className="flex items-center justify-between">
									<field.FormLabel className="text-[#2d2d2d]">
										Password
									</field.FormLabel>
									<Link
										to="/auth/forgot-password"
										className="text-sm font-medium text-[#2557a7] hover:text-[#1f4b8f]"
									>
										Forgot password?
									</Link>
								</div>
								<field.FormControl>
									<Input
										name={field.name}
										value={field.state.value}
										onChange={(event) => field.handleChange(event.target.value)}
										placeholder="••••••••"
										type="password"
										className="border-[#e4e2e0] focus-visible:ring-[#2557a7]"
									/>
								</field.FormControl>
								<field.FormMessage />
							</field.FormItem>
						)}
					/>
					<form.Subscribe
						selector={(state) => [state.canSubmit, state.isSubmitting]}
						children={([canSubmit, isSubmitting]) => (
							<Button
								type="submit"
								disabled={!canSubmit}
								className="w-full bg-[#2557a7] hover:bg-[#1f4b8f] text-white"
							>
								{isSubmitting ? (
									<>
										<Loader2 className="mr-2 h-4 w-4 animate-spin" />
										Signing in...
									</>
								) : (
									"Sign in"
								)}
							</Button>
						)}
					></form.Subscribe>
				</form>

				<div className="relative mt-6">
					<div className="absolute inset-0 flex items-center">
						<Separator className="w-full" />
					</div>
					<div className="relative flex justify-center text-sm">
						<span className="px-2 bg-white text-[#595959]">
							Or continue with
						</span>
					</div>
				</div>

				<div className="mt-6 grid grid-cols-2 gap-3">
					<Button variant="outline" className="border-[#e4e2e0] text-[#595959]">
						Google
					</Button>
					<Button variant="outline" className="border-[#e4e2e0] text-[#595959]">
						LinkedIn
					</Button>
				</div>
			</div>
		</div>
	);
}
