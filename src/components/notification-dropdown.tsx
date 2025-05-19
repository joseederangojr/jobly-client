import * as React from "react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bell, CheckCircle, Info, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Job, Notification, User } from "@/lib/types";
import { useApproveJob, useRejectJob } from "@/pages/admin/job-list";
import { useQueryClient } from "@tanstack/react-query";
import { useEcho, useEchoModel } from "@laravel/echo-react";
import { useCurrentUser } from "./layout";
import { toast } from "sonner";

export function NotificationDropdown() {
	const { notifications, id } = useCurrentUser();
	const [notifs, setNotifs] = React.useState(() => notifications);
	const [open, setOpen] = React.useState(false);
	const queryClient = useQueryClient();
	const invalidateUser = () => {
		queryClient.invalidateQueries({
			queryKey: ["me"],
		});
	};
	const approve = useApproveJob();
	const reject = useRejectJob();
	const unreadCount = notifs?.filter((n) => !n.readAt).length ?? 0;

	const { channel, leaveChannel } = useEchoModel("App.Models.User", id);

	React.useEffect(() => {
		channel().notification((notification) => {
			setNotifs((prev) => [
				{ ...notification, createdAt: new Date(), updated: new Date() },
				...prev,
			]);

			toast.info(`${notification.employer.name} just posted their first job`, {
				action: {
					label: "Approve",
					onClick: () => approve(notification.job),
				},
			});
		});
		return leaveChannel;
	}, []);

	return (
		<DropdownMenu open={open} onOpenChange={setOpen}>
			<DropdownMenuTrigger asChild>
				<Button
					variant="ghost"
					size="icon"
					className={cn(
						"relative transition-all hover:bg-gray-100 rounded-full",
						unreadCount > 0 &&
							"after:absolute after:top-1 after:right-1 after:w-2 after:h-2 after:bg-red-500 after:rounded-full",
					)}
				>
					<Bell
						className={cn(
							"h-5 w-5 transition-colors",
							unreadCount > 0 ? "text-[#2557a7]" : "text-gray-500",
						)}
					/>
					{unreadCount > 0 && (
						<span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#c42b1c] text-[10px] font-medium text-white">
							{unreadCount > 9 ? "9+" : unreadCount}
						</span>
					)}
					<span className="sr-only">Notifications</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-80">
				<DropdownMenuLabel className="flex items-center justify-between">
					<span>Notifications</span>
					{unreadCount > 0 && (
						<Button
							variant="ghost"
							size="sm"
							onClick={() => {}}
							className="h-auto p-0 text-[#2557a7]"
						>
							Mark all as read
						</Button>
					)}
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				{notifs.length === 0 ? (
					<div className="py-4 px-2 text-center text-sm text-[#595959]">
						<p>You have no notifications</p>
					</div>
				) : (
					<>
						<ScrollArea className="h-[300px]">
							<DropdownMenuGroup>
								{notifs.map((notification) => (
									<DropdownMenuItem
										key={notification.id}
										className={`flex items-start p-3 cursor-pointer ${!notification.readAt ? "bg-[#f3f2f1]" : ""}`}
									>
										<div className="mr-2 mt-0.5">
											{!notification.readAt && (
												<Info className="h-5 w-5 text-[#0066cc]" />
											)}
										</div>
										<div className="flex-1">
											<div className="text-[#2d2d2d]">
												<strong>{notification.employer.name} </strong>just
												posted their first Job{" "}
											</div>
											{notification.job.status === "pending" && (
												<div className="text-sm text-[#595959]">
													<Button
														variant="ghost"
														onClick={() => {
															approve(notification.job);
															invalidateUser();
														}}
													>
														<CheckCircle className="h-4 w-4 mr-2 text-[#0a6c2e]" />
														Approve
													</Button>
													<Button
														variant="ghost"
														onClick={() => {
															reject(notification.job);
															invalidateUser();
														}}
													>
														<XCircle className="h-4 w-4 mr-2 text-[#c42b1c]" />
														Reject
													</Button>
												</div>
											)}
											<div className="text-xs text-[#767676] mt-1">
												{new Date(notification.createdAt).toLocaleString()}
											</div>
										</div>
										{!notification.readAt && (
											<div
												className="ml-2 h-2 w-2 rounded-full bg-[#2557a7]"
												aria-hidden="true"
											/>
										)}
									</DropdownMenuItem>
								))}
							</DropdownMenuGroup>
						</ScrollArea>
						<DropdownMenuSeparator />
						<Link to="#" onClick={() => setOpen(false)}>
							<DropdownMenuItem className="cursor-pointer">
								<span className="text-[#2557a7]">View all notifications</span>
							</DropdownMenuItem>
						</Link>
					</>
				)}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
