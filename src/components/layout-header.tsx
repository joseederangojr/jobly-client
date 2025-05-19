import { Link, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { NotificationDropdown } from "@/components/notification-dropdown";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, LogOut, LayoutDashboard } from "lucide-react";
import { useCurrentUser } from "./layout";
import { useQueryClient } from "@tanstack/react-query";

export function LayoutHeader() {
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const { id, role } = useCurrentUser();
	const hasUser = !!id;

	return (
		<header className="bg-white border-b border-gray-200 sticky top-0 z-50">
			<div className="container mx-auto px-4">
				<div className="flex h-16 items-center justify-between">
					<div className="flex items-center">
						<Link to="/" className="text-2xl font-bold text-[#2557a7]">
							Jobly
						</Link>
						<nav className="ml-10 hidden md:flex items-center space-x-4">
							<Link to="/" className="text-[#595959] hover:text-[#2557a7]">
								Jobs
							</Link>

							{role === "admin" && (
								<Link
									to="/admin"
									className="text-[#595959] hover:text-[#2557a7]"
								>
									Dashboard
								</Link>
							)}

							{role === "employer" && (
								<Link
									to="/job/create"
									className="text-[#595959] hover:text-[#2557a7]"
								>
									Post a Job
								</Link>
							)}
						</nav>
					</div>

					<div className="flex items-center space-x-2">
						{hasUser && <NotificationDropdown />}

						{hasUser && (
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button variant="ghost" size="icon">
										<User className="h-5 w-5" />
										<span className="sr-only">User menu</span>
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent align="end">
									<DropdownMenuLabel>My Account</DropdownMenuLabel>
									<DropdownMenuSeparator />
									{role === "admin" && (
										<Link to="/admin">
											<DropdownMenuItem>
												<LayoutDashboard className="mr-2 h-4 w-4" />
												<span>Dashboard</span>
											</DropdownMenuItem>
										</Link>
									)}

									<DropdownMenuSeparator />
									<DropdownMenuItem
										onClick={() => {
											window.localStorage.removeItem("token");
											window.localStorage.removeItem("expires");
											queryClient.invalidateQueries({
												queryKey: ["me"],
											});
											navigate("/login");
										}}
									>
										<LogOut className="mr-2 h-4 w-4" />
										<span>Log out</span>
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						)}

						{!hasUser && (
							<Link to="/login">
								<Button className="bg-[#2557a7] hover:bg-[#1f4b8f] text-white">
									Sign In
								</Button>
							</Link>
						)}
					</div>
				</div>
			</div>
		</header>
	);
}
