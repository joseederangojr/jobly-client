import { Link } from "react-router";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Building2,
	Calendar,
	CheckCircle,
	Clock,
	ExternalLink,
	MapPin,
	MoreHorizontal,
	XCircle,
} from "lucide-react";
import type { Job } from "@/lib/types";
import { useGetJobsQuery } from "@/lib/query";
import { useApproveJob, useRejectJob } from "@/lib/mutation";

const JobListLoading = () => {
	return (
		<div className="text-center py-12">
			<h3 className="text-lg font-medium text-[#2d2d2d]">Loading</h3>
		</div>
	);
};

const JobListNoResult = () => {
	return (
		<div className="text-center py-12">
			<h3 className="text-lg font-medium text-[#2d2d2d]">No jobs found</h3>
			<p className="text-[#595959] mt-2">There are no jobs in this category.</p>
		</div>
	);
};

function StatusBadge({ status }: { status: Job["status"] }) {
	switch (status) {
		case "pending":
			return (
				<Badge
					variant="outline"
					className="bg-[#fff8e6] text-[#946c00] border-[#946c00] hover:bg-[#fff8e6]"
				>
					<Clock className="h-3 w-3 mr-1" />
					Pending
				</Badge>
			);
		case "approved":
			return (
				<Badge
					variant="outline"
					className="bg-[#e6f7ed] text-[#0a6c2e] border-[#0a6c2e] hover:bg-[#e6f7ed]"
				>
					<CheckCircle className="h-3 w-3 mr-1" />
					Approved
				</Badge>
			);
		case "rejected":
			return (
				<Badge
					variant="outline"
					className="bg-[#fbe9e9] text-[#c42b1c] border-[#c42b1c] hover:bg-[#fbe9e9]"
				>
					<XCircle className="h-3 w-3 mr-1" />
					Rejected
				</Badge>
			);
		default:
			return null;
	}
}

interface ApproveButtonProps
	extends React.ComponentProps<typeof DropdownMenuItem> {
	job: Job;
	onClick?: never;
}
function ApproveButton(props: ApproveButtonProps) {
	const { job } = props;

	const approveMutation = useApproveJob();

	return (
		<DropdownMenuItem onClick={() => approveMutation.mutate(job.id)} {...props}>
			<CheckCircle className="h-4 w-4 mr-2 text-[#0a6c2e]" />
			Approve Job
		</DropdownMenuItem>
	);
}

interface RejectButtonProps
	extends React.ComponentProps<typeof DropdownMenuItem> {
	job: Job;
	onClick?: never;
}
function RejectButton(props: RejectButtonProps) {
	const { job } = props;
	const rejectMutation = useRejectJob();
	return (
		<DropdownMenuItem onClick={() => rejectMutation.mutate(job.id)}>
			<XCircle className="h-4 w-4 mr-2 text-[#c42b1c]" />
			Reject Job
		</DropdownMenuItem>
	);
}

export function JobList() {
	const { isLoading, data: jobs } = useGetJobsQuery();
	if (isLoading) {
		return <JobListLoading />;
	}
	if (jobs.data.length === 0) {
		return <JobListNoResult />;
	}

	return (
		<div className="overflow-x-auto">
			<table className="w-full border-collapse">
				<thead>
					<tr className="bg-[#f9f9f9] text-[#595959]">
						<th className="px-4 py-3 text-left font-medium">Job Title</th>
						<th className="px-4 py-3 text-left font-medium">Company</th>
						<th className="px-4 py-3 text-left font-medium">Location</th>
						<th className="px-4 py-3 text-left font-medium">Posted</th>
						<th className="px-4 py-3 text-left font-medium">Status</th>
						<th className="px-4 py-3 text-left font-medium">Actions</th>
					</tr>
				</thead>
				<tbody className="divide-y divide-gray-200">
					{jobs.data.map((job) => {
						return (
							<tr key={job.id} className="hover:bg-[#f9f9f9]">
								<td className="px-4 py-4">
									<div className="flex flex-col">
										<Link
											to={`/job/${job.id}`}
											type="button"
											className="text-[#2557a7] font-medium text-left hover:underline"
										>
											{job.name}
										</Link>
										<span className="text-sm text-[#595959]">
											{job.department}
										</span>
									</div>
								</td>
								<td className="px-4 py-4">
									<div className="flex items-center">
										<Building2 className="h-4 w-4 mr-1 text-[#595959]" />
										<span>{job.subcompany}</span>
									</div>
								</td>
								<td className="px-4 py-4">
									<div className="flex items-center">
										<MapPin className="h-4 w-4 mr-1 text-[#595959]" />
										<span>{job.office}</span>
									</div>
								</td>
								<td className="px-4 py-4">
									<div className="flex items-center">
										<Calendar className="h-4 w-4 mr-1 text-[#595959]" />
										<span>{new Date(job.createdAt).toLocaleDateString()}</span>
									</div>
								</td>
								<td className="px-4 py-4">
									<StatusBadge status={job.status} />
								</td>
								<td className="px-4 py-4">
									<div className="flex items-center space-x-2">
										<Link to={`/job/${job.id}`}>
											<Button
												variant="outline"
												size="sm"
												className="h-8 border-[#e4e2e0] text-[#2557a7]"
											>
												<ExternalLink className="h-3.5 w-3.5 mr-1" />
												View
											</Button>
										</Link>

										<DropdownMenu>
											<DropdownMenuTrigger asChild>
												<Button
													variant="outline"
													size="sm"
													className="h-8 border-[#e4e2e0] text-[#595959]"
													disabled={false}
												>
													<MoreHorizontal className="h-4 w-4" />
													<span className="sr-only">Actions</span>
												</Button>
											</DropdownMenuTrigger>
											<DropdownMenuContent align="end" className="w-48">
												<DropdownMenuLabel>Job Actions</DropdownMenuLabel>
												<DropdownMenuSeparator />
												<Link to={`/job/${job.id}`}>
													<DropdownMenuItem>
														<ExternalLink className="h-4 w-4 mr-2" />
														View Details
													</DropdownMenuItem>
												</Link>
												{job.status === "pending" && (
													<>
														<ApproveButton job={job} />
														<RejectButton job={job} />
													</>
												)}
											</DropdownMenuContent>
										</DropdownMenu>
									</div>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}
