import { z } from "zod";
import { HTTPError } from "ky";
import { api } from "./ky";
import type { ValidationError } from "../errors";

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
