import { HTTPError } from "ky";
import { z } from "zod";
import type { ValidationError } from "../errors";
import { api } from "./ky";
import type { Notification, User } from "../types";

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
export const login = async (data: LoginData) => {
	try {
		return await api
			.post("auth/login", {
				json: data,
			})
			.json<LoginResult>();
	} catch (err) {
		if (err instanceof HTTPError) {
			throw await err.response.json();
		}

		throw err;
	}
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
		role: z.string().min(1),
	})
	.superRefine((data, ctx) => {
		if (data.password !== data.passwordConfirmation) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: "Password should be confirmed",
				path: ["passwordConfirmation"],
			});
		}

		if (!["candidate", "employer"].includes(data.role)) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: "Invalid role",
				path: ["role"],
			});
		}
	});
export type RegisterData = z.infer<typeof registerSchema>;
export type RegisterError = ValidationError<RegisterData>;
export type RegisterResult = {
	accessToken: string;
	expiresIn: string;
};
export const register = async (data: RegisterData) => {
	try {
		return await api
			.post("auth/register", {
				json: data,
			})
			.json<RegisterResult>();
	} catch (err) {
		if (err instanceof HTTPError) {
			throw await err.response.json();
		}

		throw err;
	}
};

export const getUserNotifications = () => {
	return api.get("user/notification").json<Notification[]>();
};

type MarkAllAsReadMutation = {
	ids: Notification["id"][];
};
export const markAllAsRead = (data: MarkAllAsReadMutation) => {
	return api.post("user/notification", { json: data }).json<Notification[]>();
};
