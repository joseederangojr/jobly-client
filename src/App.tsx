import { Loading as AuthLoading } from "@/components/auth";
import HomeLoading from "@/pages/home/loading";
import * as React from "react";
import { Link, Route, Routes } from "react-router";
import CreateJobLoading from "./pages/job-create/loading";
import AdminLoading from "./pages/admin/loading";
import { RootLayout } from "./components/layout";

const HomePage = React.lazy(() => import("./pages/home/page"));
const LoginPage = React.lazy(() => import("./pages/login/page"));
const RegisterPage = React.lazy(() => import("./pages/register/page"));
const CreateJobPage = React.lazy(() => import("./pages/job-create/page"));
const AdminPage = React.lazy(() => import("./pages/admin/page"));

export default function App() {
	return (
		<Routes>
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
			<Route element={<RootLayout />}>
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
					path="/job/create"
					element={
						<React.Suspense fallback={<CreateJobLoading />}>
							<CreateJobPage />
						</React.Suspense>
					}
				/>

				<Route
					path="/admin"
					element={
						<React.Suspense fallback={<AdminLoading />}>
							<AdminPage />
						</React.Suspense>
					}
				/>
			</Route>

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
