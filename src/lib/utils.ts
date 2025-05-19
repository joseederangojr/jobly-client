import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const createEmptyPaginatedResult = () => {
	return {
		from: 0,
		currentPage: 0,
		data: [],
		firstPageUrl: null,
		lastPage: 0,
		lastPageUrl: null,
		links: [],
		nextPageUrl: null,
		path: "",
		perPage: 15,
		prevPageUrl: null,
		to: 0,
		total: 0,
	};
};

export const createEmptyUser = () => ({
	id: 0,
	name: "",
	role: "guest",
	notifications: [],
	email: "",
	createdAt: new Date(),
	updatedAt: new Date(),
	deletedAt: new Date(),
});
