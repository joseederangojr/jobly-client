import { Skeleton } from "@/components/ui/skeleton";

export default function LoginLoading() {
	return (
		<div className="min-h-screen bg-[#f3f2f1] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-sm border border-gray-200">
				<div className="text-center">
					<div className="flex justify-center">
						<Skeleton className="h-14 w-14 rounded-full" />
					</div>
					<Skeleton className="h-9 w-48 mx-auto mt-4" />
					<Skeleton className="h-5 w-64 mx-auto mt-2" />
				</div>

				<div className="space-y-6">
					<div className="space-y-2">
						<Skeleton className="h-5 w-32" />
						<Skeleton className="h-10 w-full" />
					</div>

					<div className="space-y-2">
						<div className="flex items-center justify-between">
							<Skeleton className="h-5 w-24" />
							<Skeleton className="h-5 w-32" />
						</div>
						<Skeleton className="h-10 w-full" />
					</div>

					<Skeleton className="h-10 w-full" />
				</div>

				<div className="relative mt-6">
					<div className="absolute inset-0 flex items-center">
						<Skeleton className="w-full h-px" />
					</div>
					<div className="relative flex justify-center text-sm">
						<Skeleton className="h-5 w-32 bg-white" />
					</div>
				</div>

				<div className="mt-6 grid grid-cols-2 gap-3">
					<Skeleton className="h-10 w-full" />
					<Skeleton className="h-10 w-full" />
				</div>
			</div>
		</div>
	);
}
