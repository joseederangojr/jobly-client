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
import { Bell, CheckCircleIcon, Info, XCircleIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Job, Notification } from "@/lib/types";
import {
	useApproveJob,
	useMarkAllAsReadMutation,
	useRejectJob,
} from "@/lib/mutation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEchoModel } from "@laravel/echo-react";
import { useCurrentUser } from "./layout";
import { toast } from "sonner";
import {
	createGetUserNotificationQuery,
	useGetUserNotificationQuery,
} from "@/lib/query";

type NotificationActionProps = {
	job: Job;
};
const NotificationAction = (props: NotificationActionProps) => {
	const approveMutation = useApproveJob();
	const rejectMutation = useRejectJob();
	const approve = (event: React.MouseEvent) => {
		event.preventDefault();
		event.stopPropagation();
		approveMutation.mutate(props.job.id);
	};
	const reject = (event: React.MouseEvent) => {
		event.preventDefault();
		event.stopPropagation();
		rejectMutation.mutate(props.job.id);
	};
	return (
		<React.Fragment>
			<br />
			<div className="flex gap-2 item-center">
				<Button size="sm" variant="outline" onClick={approve}>
					<CheckCircleIcon className="h-4 w-4 mr-2 text-[#0a6c2e]" />
					Approve Job
				</Button>

				<Button size="sm" variant="outline" onClick={reject}>
					<XCircleIcon className="h-4 w-4 mr-2 text-[#c42b1c]" />
					Reject Job
				</Button>
			</div>
		</React.Fragment>
	);
};

const NotificationMarkAllAsRead = () => {
	const markAllAsReadMutation = useMarkAllAsReadMutation();
	const { data } = useQuery({
		...createGetUserNotificationQuery(),
		select: (notifications) => notifications.map((n) => n.id),
	});
	return (
		<Button
			variant="ghost"
			size="sm"
			onClick={() => markAllAsReadMutation.mutate(data)}
			className="h-auto p-0 text-[#2557a7]"
		>
			Mark all as read
		</Button>
	);
};

type NotificationDropdownItemProps = {
	notification: Notification;
};
const NotificationDropdownItem = (props: NotificationDropdownItemProps) => {
	const { notification } = props;
	const markAllAsReadMutation = useMarkAllAsReadMutation();
	return (
		<DropdownMenuItem
			asChild
			className={`flex items-start p-3 cursor-pointer ${!notification.readAt ? "bg-[#f3f2f1]" : ""}`}
			onClick={() => markAllAsReadMutation.mutate([notification.id])}
		>
			<Link to={`/job/${notification.job.id}`}>
				<div className="mr-2 mt-0.5">
					{!notification.readAt && <Info className="h-5 w-5 text-[#0066cc]" />}
				</div>
				<div className="flex-1">
					<div className="text-[#2d2d2d]">
						<strong>{notification.employer.name} </strong>just posted their
						first Job{" "}
					</div>
					{notification.job.status === "pending" && (
						<NotificationAction job={notification.job} />
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
			</Link>
		</DropdownMenuItem>
	);
};

export function NotificationDropdown() {
	const { id } = useCurrentUser();
	const { data: notifications } = useGetUserNotificationQuery();
	const [open, setOpen] = React.useState(false);
	const queryClient = useQueryClient();

	const unreadCount =
		notifications?.filter((n: Notification) => !n.readAt).length ?? 0;

	const { channel, leaveChannel } = useEchoModel("App.Models.User", id);

	React.useEffect(() => {
		channel().notification((notification: Notification) => {
			toast.info(`${notification.employer.name} just posted their first job`, {
				action: <NotificationAction job={notification.job} />,
			});

			queryClient.invalidateQueries({ queryKey: ["notifications"] });
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
					{unreadCount > 0 && <NotificationMarkAllAsRead />}
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				{notifications.length === 0 ? (
					<div className="py-4 px-2 text-center text-sm text-[#595959]">
						<p>You have no notifications</p>
					</div>
				) : (
					<>
						<ScrollArea className="h-[300px]">
							<DropdownMenuGroup>
								{notifications.map((notification: Notification) => (
									<NotificationDropdownItem
										key={`notif-${notification.id}`}
										notification={notification}
									/>
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
