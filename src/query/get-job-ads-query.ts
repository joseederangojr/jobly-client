import { getJobs } from "@/lib/api/job";
import { queryOptions } from "@tanstack/react-query";

export const getJobsQuery = (search: URLSearchParams) =>
	queryOptions({
		queryKey: ["jobs", search.toString()],
		queryFn: () => getJobs(search),
	});
