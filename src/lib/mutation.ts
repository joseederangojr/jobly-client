import {
	login,
	markAllAsRead,
	register,
	type LoginData,
	type LoginError,
	type LoginResult,
	type RegisterData,
	type RegisterError,
	type RegisterResult,
} from "./api/auth";
import {
	useMutation,
	useQueryClient,
	type UseMutationOptions,
} from "@tanstack/react-query";
import { approveJob, rejectJob } from "./api/job";
import { toast } from "sonner";
import type { Notification } from "./types";

export const useLoginMutation = <TContext = unknown>(
	options?: UseMutationOptions<LoginResult, LoginError, LoginData, TContext>,
) => {
	const queryClient = useQueryClient();
	return useMutation<LoginResult, LoginError, LoginData, TContext>({
		mutationKey: ["login"],
		mutationFn: async (data) => login(data),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["me"],
			});
		},
		...(options ?? {}),
	});
};

export const useRegisterMutation = <TContext = unknown>(
	options?: UseMutationOptions<
		RegisterResult,
		RegisterError,
		RegisterData,
		TContext
	>,
) => {
	const queryClient = useQueryClient();
	const registerMutation = useMutation<
		RegisterResult,
		RegisterError,
		RegisterData,
		TContext
	>({
		mutationKey: ["register"],
		mutationFn: (data) => register(data),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["me"],
			});
		},
		...(options ?? {}),
	});

	return registerMutation;
};

export const useApproveJob = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationKey: ["job", { approve: true }],
		mutationFn: (id: number) => approveJob(id),
		onSuccess: () => {
			toast.success("Job approved");
		},
		onSettled: async () => {
			await queryClient.invalidateQueries({
				queryKey: ["jobs"],
			});

			await queryClient.invalidateQueries({
				queryKey: ["me"],
			});
		},
	});
};

export const useRejectJob = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationKey: ["job", { reject: true }],
		mutationFn: (id: number) => rejectJob(id),
		onSuccess: () => {
			toast.error("Job rejected");
		},
		onSettled: async () => {
			await queryClient.invalidateQueries({
				queryKey: ["jobs"],
			});

			queryClient.invalidateQueries({
				queryKey: ["me"],
			});
		},
	});
};

export const useMarkAllAsReadMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationKey: ["notification", { read: true }],
		mutationFn: (ids: Notification["id"][]) => markAllAsRead({ ids }),
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ["notifications"] });
		},
	});
};
