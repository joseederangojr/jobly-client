import * as React from "react";
import LoginLoading from "@/pages/login/loading";
import { Routes, Route, Link } from "react-router";

const LoginPage = React.lazy(() => import("./pages/login/page"));

export default function App() {
	return (
		<Routes>
			<Route
				path="/login"
				element={
					<React.Suspense fallback={<LoginLoading />}>
						<LoginPage />
					</React.Suspense>
				}
			/>
			<Route
				path="*"
				element={
					<h1>
						404: Page not found<Link to="/login">Login</Link>
					</h1>
				}
			/>
		</Routes>
	);
}
