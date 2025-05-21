"use client";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { CheckCircle, XCircle } from "lucide-react";
import type { Job } from "@/lib/types";
import { useApproveJob, useRejectJob } from "@/lib/mutation";

interface AdminJobActionsProps {
	job: Job;
}

export function AdminJobActions({ job }: AdminJobActionsProps) {
	const approveMutation = useApproveJob();
	const rejectMutation = useRejectJob();

	if (job.status === "approved") {
		return (
			<div className="space-y-4">
				<div className="bg-[#e6f7ed] text-[#0a6c2e] p-4 rounded">
					<p className="flex items-center font-medium">
						<CheckCircle className="h-5 w-5 mr-2" />
						This job has been approved
					</p>
					<p className="text-sm mt-1">
						This job posting is live and visible to job seekers.
					</p>
				</div>

				<Dialog>
					<DialogTrigger asChild>
						<Button
							variant="outline"
							className="w-full border-[#c42b1c] text-[#c42b1c] hover:bg-[#fbe9e9]"
						>
							<XCircle className="h-4 w-4 mr-2" />
							Revoke Approval
						</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Revoke Job Approval</DialogTitle>
							<DialogDescription>
								Are you sure you want to revoke the approval for this job? This
								will remove it from the job board.
							</DialogDescription>
						</DialogHeader>
						<DialogFooter>
							<DialogClose asChild>
								<Button variant="outline">Cancel</Button>
							</DialogClose>
							<Button
								variant="destructive"
								onClick={() => rejectMutation.mutate(job.id)}
								disabled={rejectMutation.isPending}
							>
								{rejectMutation.isPending ? "Revoking..." : "Revoke Approval"}
							</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</div>
		);
	}

	if (job.status === "rejected") {
		return (
			<div className="space-y-4">
				<div className="bg-[#fbe9e9] text-[#c42b1c] p-4 rounded">
					<p className="flex items-center font-medium">
						<XCircle className="h-5 w-5 mr-2" />
						This job has been rejected
					</p>
					<p className="text-sm mt-1">
						This job posting is not visible to job seekers.
					</p>
				</div>

				<Button
					className="w-full bg-[#2557a7] hover:bg-[#1f4b8f] text-white"
					onClick={() => approveMutation.mutate(job.id)}
					disabled={approveMutation.isPending}
				>
					<CheckCircle className="h-4 w-4 mr-2" />
					{approveMutation.isPending ? "Approving..." : "Approve Job"}
				</Button>
			</div>
		);
	}

	return (
		<div className="space-y-4">
			<div className="bg-[#fff8e6] text-[#946c00] p-4 rounded">
				<p className="font-medium">This job is pending review</p>
				<p className="text-sm mt-1">
					Please review the job details and either approve or reject this
					posting.
				</p>
			</div>

			<Button
				className="w-full bg-[#0a6c2e] hover:bg-[#085724] text-white"
				onClick={() => approveMutation.mutate(job.id)}
				disabled={approveMutation.isPending}
			>
				<CheckCircle className="h-4 w-4 mr-2" />
				{approveMutation.isPending ? "Approving..." : "Approve Job"}
			</Button>

			<Dialog>
				<DialogTrigger asChild>
					<Button
						variant="outline"
						className="w-full border-[#c42b1c] text-[#c42b1c] hover:bg-[#fbe9e9]"
					>
						<XCircle className="h-4 w-4 mr-2" />
						Reject Job
					</Button>
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Reject Job Posting</DialogTitle>
						<DialogDescription>
							Please provide a reason for rejecting this job posting. This will
							be visible to the employer.
						</DialogDescription>
					</DialogHeader>
					<DialogFooter>
						<DialogClose asChild>
							<Button variant="outline">Cancel</Button>
						</DialogClose>
						<Button
							variant="destructive"
							onClick={() => rejectMutation.mutate(job.id)}
							disabled={rejectMutation.isPending}
						>
							{rejectMutation.isPending ? "Rejecting..." : "Reject Job"}
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
}
