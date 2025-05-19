"use client";

import { JobCard } from "@/components/job-card";
import { getJobs } from "@/lib/api/job";
import type { Job } from "@/lib/types";
import { getJobsQuery } from "@/query/get-job-ads-query";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useSearchParams } from "react-router";

interface JobListProps {
	onSelectJob?: (job: Job) => void;
	selectedJobId?: number | null;
}

export function JobList({ onSelectJob, selectedJobId }: JobListProps) {
	const [searchParams] = useSearchParams();
	const { isLoading, data: jobs } = useQuery(getJobsQuery(searchParams));

	const handleJobClick = (job: Job) => {
		if (onSelectJob) {
			onSelectJob(job);
		}
	};

	if (isLoading) {
		return (
			<div className="absolute inset-0 bg-white/80 flex justify-center items-center z-10">
				<Loader2 className="h-8 w-8 text-[#2557a7] animate-spin" />
			</div>
		);
	}

	if (!isLoading && jobs && jobs.data.length === 0) {
		return (
			<div className="text-center py-12 px-4">
				<h3 className="text-lg font-medium text-[#2d2d2d] mb-2">
					No jobs found
				</h3>
				<p className="text-[#595959]">
					Try adjusting your search filters for more results
				</p>
			</div>
		);
	}

	return (
		<div className="divide-y divide-gray-200 relative">
			{jobs!.data.map((job) => (
				<JobCard
					key={job.id}
					job={job}
					isSelected={selectedJobId === job.id}
					onClick={handleJobClick}
				/>
			))}
		</div>
	);
}
