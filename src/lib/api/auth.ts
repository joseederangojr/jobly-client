import type { HTTPError } from "ky";
import { z } from "zod";
import type { ValidationError } from "../errors";
import { api } from "./ky";
import type { User } from "../types";

export const getCurrentUser = () => {
	return api.get("auth/current").json<User>();
};

export const loginSchema = z.object({
	email: z.string().email({ message: "Please enter a valid email address" }),
	password: z
		.string()
		.min(8, { message: "Password must be at least 8 characters" }),
});
export type LoginData = z.infer<typeof loginSchema>;
export type LoginError = ValidationError<LoginData>;
export type LoginResult = {
	accessToken: string;
	expiresIn: string;
};
export const login = (data: LoginData) => {
	return api
		.post("auth/login", {
			json: data,
		})
		.json<LoginResult>()
		.catch(async (err: HTTPError<LoginError>) => {
			throw await err.response.json();
		});
};

export const registerSchema = z
	.object({
		name: z.string().min(2, { message: "Name must be at least 2 characters" }),
		email: z.string().email({ message: "Please enter a valid email address" }),
		password: z
			.string()
			.min(8, { message: "Password must be at least 8 characters" }),
		passwordConfirmation: z
			.string()
			.min(8, { message: "Password must be at least 8 characters" }),
		role: z.enum(["candidate", "employer"], {
			required_error: "Please select a role",
		}),
	})
	.refine(
		(data) => {
			// If role is employer, companyName is required
			if (data.password === data.passwordConfirmation) {
				return true;
			}
			return true;
		},
		{
			message: "Password should be confirmed",
			path: ["passwordConfirmation"],
		},
	);
export type RegisterData = z.infer<typeof registerSchema>;
export type RegisterError = ValidationError<RegisterData>;
export type RegisterResult = {
	accessToken: string;
	expiresIn: string;
};
export const register = (data: RegisterData) => {
	return api
		.post("auth/register", {
			json: data,
		})
		.json<RegisterResult>()
		.catch(async (err: HTTPError<RegisterError>) => {
			throw await err.response.json();
		});
};
