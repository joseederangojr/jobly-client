import { getJobOptions, getJobs } from "@/lib/api/job";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import { getCurrentUser } from "./api/auth";
import { createEmptyPaginatedResult, createEmptyUser } from "./utils";

export const createGetJobsQuery = (search: URLSearchParams) =>
	queryOptions({
		queryKey: ["jobs", { search: search.toString() }],
		queryFn: () => getJobs(search),
		initialData: () => createEmptyPaginatedResult(),
	});

export const useGetJobsQuery = () => {
	const [searchParams] = useSearchParams();
	return useQuery(createGetJobsQuery(searchParams));
};

export const createGetCurrentUserQuery = () => {
	return queryOptions({
		queryKey: ["me"],
		queryFn: () => getCurrentUser(),
		initialData: () => createEmptyUser(),
	});
};

export const useGetCurrentUserQuery = () => {
	return useQuery(createGetCurrentUserQuery());
};

export const createGetJobOptionsQuery = () => {
	return queryOptions({
		queryKey: ["jobs", { options: true }],
		queryFn: () => getJobOptions(),
		initialData: { department: [], seniority: [] },
	});
};

export const useGetJobOptionsQuery = () => {
	return useQuery(createGetJobOptionsQuery());
};
