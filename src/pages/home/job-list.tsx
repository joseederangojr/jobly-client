"use client";

import { JobCard } from "./job-card";
import { useGetJobsQuery } from "@/lib/query";
import { Loader2 } from "lucide-react";

const JobListLoading = () => (
	<div className="absolute inset-0 bg-white/80 flex justify-center items-center z-10">
		<Loader2 className="h-8 w-8 text-[#2557a7] animate-spin" />
	</div>
);

const JobListNoResult = () => (
	<div className="text-center py-12 px-4">
		<h3 className="text-lg font-medium text-[#2d2d2d] mb-2">No jobs found</h3>
		<p className="text-[#595959]">
			Try adjusting your search filters for more results
		</p>
	</div>
);

export function JobList() {
	const { isLoading, data: jobs } = useGetJobsQuery();

	if (isLoading) {
		return <JobListLoading />;
	}

	if (!isLoading && jobs.data.length === 0) {
		return <JobListNoResult />;
	}

	return (
		<div className="divide-y divide-gray-200 relative">
			{jobs.data.map((job) => (
				<JobCard key={`job-${job.id}`} job={job} />
			))}
		</div>
	);
}
