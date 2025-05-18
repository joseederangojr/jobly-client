import { Loading as AuthLoading } from "@/components/auth";
import HomeLoading from "@/pages/home/loading";
import * as React from "react";
import { Link, Route, Routes } from "react-router";

const HomePage = React.lazy(() => import("./pages/home/page"));
const LoginPage = React.lazy(() => import("./pages/login/page"));
const RegisterPage = React.lazy(() => import("./pages/register/page"));

export default function App() {
	return (
		<Routes>
			<Route
				index
				path="/"
				element={
					<React.Suspense fallback={<HomeLoading />}>
						<HomePage />
					</React.Suspense>
				}
			/>
			<Route
				path="/login"
				element={
					<React.Suspense fallback={<AuthLoading />}>
						<LoginPage />
					</React.Suspense>
				}
			/>
			<Route
				path="/register"
				element={
					<React.Suspense fallback={<AuthLoading />}>
						<RegisterPage />
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
