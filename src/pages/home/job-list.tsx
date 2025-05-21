"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { JobCard } from "./job-card";
import { useGetJobsQuery } from "@/lib/query";

const JobListNoResult = () => (
	<div className="text-center py-12 px-4">
		<h3 className="text-lg font-medium text-[#2d2d2d] mb-2">No jobs found</h3>
		<p className="text-[#595959]">
			Try adjusting your search filters for more results
		</p>
	</div>
);

export const JobListLoading = () => (
	<div className="divide-y divide-gray-200">
		{Array.from({ length: 5 }).map((_, index) => (
			<div key={`jls-${index}`} className="p-4">
				<Skeleton className="h-6 w-3/4 mb-2" />
				<div className="flex items-center gap-3 mb-2">
					<div className="flex items-center">
						<Skeleton className="h-4 w-4 mr-1" />
						<Skeleton className="h-4 w-32" />
					</div>
					<div className="flex items-center">
						<Skeleton className="h-4 w-4 mr-1" />
						<Skeleton className="h-4 w-32" />
					</div>
				</div>
				<div className="flex flex-wrap gap-2 mb-3">
					<Skeleton className="h-6 w-24" />
					<Skeleton className="h-6 w-24" />
					<Skeleton className="h-6 w-24" />
				</div>
				<Skeleton className="h-4 w-full mb-2" />
				<Skeleton className="h-4 w-2/3 mb-3" />
				<div className="flex items-center">
					<Skeleton className="h-3 w-3 mr-1" />
					<Skeleton className="h-3 w-24" />
				</div>
			</div>
		))}
	</div>
);

export function JobList() {
	const { data: jobs } = useGetJobsQuery();

	if (jobs.data.length === 0) {
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
