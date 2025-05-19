import * as React from "react";
import { Badge } from "@/components/ui/badge";
import type { Job } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Building2, Clock, MapPin } from "lucide-react";
import { useHomeContext } from "@/pages/home/home";

interface JobCardProps extends React.ComponentProps<"div"> {
	job: Job;
}

export const JobCard = React.memo(function JobCard(props: JobCardProps) {
	const { job, ...rest } = props;
	const ctx = useHomeContext();
	const isSelected = ctx?.selectedJob?.id === job.id;
	const handleClick = () => {
		ctx.setSelectedJob?.(job);
	};
	return (
		<div
			className={cn(
				"p-4 border-b border-gray-200 hover:bg-[#f9f9f9] transition-colors cursor-pointer",
				isSelected ? "bg-[#f3f2f1]" : "",
			)}
			onClick={handleClick}
			{...rest}
		>
			<h2 className="text-lg font-semibold text-[#2557a7] mb-1">{job.name}</h2>

			<div className="flex items-center text-[#595959] mb-2">
				<Building2 className="h-4 w-4 mr-1 flex-shrink-0" />
				<span className="mr-3 truncate">{job.subcompany}</span>
				<MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
				<span className="truncate">{job.office}</span>
			</div>

			<div className="flex flex-wrap gap-2 mb-3">
				<Badge
					variant="outline"
					className="bg-[#f3f2f1] text-[#595959] hover:bg-[#f3f2f1] border-[#e4e2e0]"
				>
					{job.employmentType}
				</Badge>
				<Badge
					variant="outline"
					className="bg-[#f3f2f1] text-[#595959] hover:bg-[#f3f2f1] border-[#e4e2e0]"
				>
					{job.schedule}
				</Badge>
				{job.seniority && (
					<Badge
						variant="outline"
						className="bg-[#f3f2f1] text-[#595959] hover:bg-[#f3f2f1] border-[#e4e2e0]"
					>
						{job.seniority}
					</Badge>
				)}
			</div>

			{/* Job snippet - first few lines of the first description */}
			<div className="text-sm text-[#595959] mb-3 line-clamp-2">
				{job.jobDescriptions?.[0]?.value
					.replace(/<[^>]*>/g, " ")
					.substring(0, 150)}
				...
			</div>

			<div className="flex items-center text-xs text-[#767676]">
				<Clock className="h-3 w-3 mr-1" />
				<span>Posted {getTimeAgo(job.createdAt)}</span>
			</div>
		</div>
	);
});

// Helper function to format time ago
function getTimeAgo(dateString: string | Date): string {
	const date = new Date(dateString);
	const now = new Date();
	const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

	if (diffInSeconds < 60) {
		return "just now";
	}

	const diffInMinutes = Math.floor(diffInSeconds / 60);
	if (diffInMinutes < 60) {
		return `${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`;
	}

	const diffInHours = Math.floor(diffInMinutes / 60);
	if (diffInHours < 24) {
		return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
	}

	const diffInDays = Math.floor(diffInHours / 24);
	if (diffInDays < 30) {
		return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
	}

	const diffInMonths = Math.floor(diffInDays / 30);
	return `${diffInMonths} month${diffInMonths > 1 ? "s" : ""} ago`;
}
