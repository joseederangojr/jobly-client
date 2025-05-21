import { getJob, getJobOptions, getJobs } from "@/lib/api/job";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import { getCurrentUser, getUserNotifications } from "./api/auth";
import { createEmptyPaginatedResult, createEmptyUser } from "./utils";

export const createGetJobQuery = (id: number) =>
	queryOptions({
		queryKey: ["jobs", { id }],
		queryFn: () => getJob(id),
	});

export const useGetJobQuery = (id: number) => {
	return useSuspenseQuery(createGetJobQuery(id));
};

export const createGetJobsQuery = (search: URLSearchParams) =>
	queryOptions({
		queryKey: ["jobs", { search: search.toString() }],
		queryFn: () => getJobs(search),
	});

export const useGetJobsQuery = () => {
	const [searchParams] = useSearchParams();
	return useSuspenseQuery(createGetJobsQuery(searchParams));
};

export const createGetCurrentUserQuery = () => {
	return queryOptions({
		queryKey: ["me"],
		queryFn: () => getCurrentUser(),
	});
};

export const useGetCurrentUserQuery = () => {
	return useSuspenseQuery(createGetCurrentUserQuery());
};

export const createGetJobOptionsQuery = () => {
	return queryOptions({
		queryKey: ["jobs", { options: true }],
		queryFn: () => getJobOptions(),
	});
};

export const useGetJobOptionsQuery = () => {
	return useSuspenseQuery(createGetJobOptionsQuery());
};

export const createGetUserNotificationQuery = () => {
	return queryOptions({
		queryKey: ["notifications"],
		queryFn: () => getUserNotifications(),
	});
};

export const useGetUserNotificationQuery = () => {
	return useSuspenseQuery(createGetUserNotificationQuery());
};
