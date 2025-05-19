import * as React from "react";
import { Outlet } from "react-router";
import { LayoutHeader } from "./layout-header";
import type { User } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "@/lib/api/auth";

const CurrentUserContext = React.createContext<User>({
	id: 0,
	name: "",
	role: "guest",
	notifications: [],
	email: "",
	createdAt: new Date(),
	updatedAt: new Date(),
	deletedAt: new Date(),
});

export const useCurrentUser = () => {
	const ctx = React.use(CurrentUserContext);
	if (!ctx) {
		throw new Error(
			`useCurrentUser should be used within <CurrentUserContext>`,
		);
	}

	return ctx;
};

export const RootLayout = () => {
	const query = useQuery({
		queryKey: ["me"],
		queryFn: () => getCurrentUser(),
		initialData: {
			id: 0,
			name: "",
			role: "guest",
			notifications: [],
			email: "",
			createdAt: new Date(),
			updatedAt: new Date(),
			deletedAt: new Date(),
		},
	});
	if (query.isLoading) return <Outlet />;
	return (
		<CurrentUserContext.Provider value={query.data}>
			<LayoutHeader />
			<Outlet />
		</CurrentUserContext.Provider>
	);
};
