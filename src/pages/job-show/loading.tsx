import { Skeleton } from "@/components/ui/skeleton";

export default function JobShowLoading() {
	return (
		<div className="min-h-screen bg-[#f3f2f1]">
			<div className="bg-white border-b border-gray-200 shadow-sm">
				<div className="container mx-auto py-6 px-4">
					<Skeleton className="h-6 w-48 mb-2" />
					<Skeleton className="h-8 w-64" />
				</div>
			</div>

			<div className="container mx-auto py-6 px-4">
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
					{/* Main job content skeleton */}
					<div className="lg:col-span-8">
						<div className="bg-white rounded border border-gray-200 shadow-sm p-6 mb-5">
							<div className="flex justify-between items-start mb-4">
								<div>
									<Skeleton className="h-8 w-64 mb-2" />
									<Skeleton className="h-5 w-40 mb-1" />
								</div>
								<Skeleton className="h-6 w-24" />
							</div>

							<div className="flex flex-wrap gap-4 text-[#595959] mb-4">
								<Skeleton className="h-5 w-32" />
								<Skeleton className="h-5 w-32" />
								<Skeleton className="h-5 w-32" />
							</div>

							<div className="flex flex-wrap gap-2 mb-4">
								<Skeleton className="h-6 w-24" />
								<Skeleton className="h-6 w-24" />
								<Skeleton className="h-6 w-24" />
							</div>

							<Skeleton className="h-px w-full my-6" />

							<div className="space-y-6">
								<div className="space-y-3">
									<Skeleton className="h-6 w-40" />
									<Skeleton className="h-4 w-full" />
									<Skeleton className="h-4 w-full" />
									<Skeleton className="h-4 w-3/4" />
								</div>

								<div className="space-y-3">
									<Skeleton className="h-6 w-40" />
									<Skeleton className="h-4 w-full" />
									<Skeleton className="h-4 w-full" />
									<Skeleton className="h-4 w-3/4" />
								</div>
							</div>
						</div>
					</div>

					{/* Sidebar skeleton */}
					<div className="lg:col-span-4">
						<div className="bg-white rounded border border-gray-200 shadow-sm p-6 mb-5">
							<Skeleton className="h-6 w-32 mb-4" />
							<div className="space-y-4">
								<Skeleton className="h-[100px] w-full" />
								<Skeleton className="h-10 w-full" />
							</div>
						</div>

						<div className="bg-white rounded border border-gray-200 shadow-sm p-6 mb-5">
							<Skeleton className="h-6 w-48 mb-4" />
							<div className="space-y-4">
								<div>
									<Skeleton className="h-5 w-24 mb-1" />
									<Skeleton className="h-5 w-40" />
								</div>
								<div>
									<Skeleton className="h-5 w-24 mb-1" />
									<Skeleton className="h-5 w-40" />
								</div>
								<div>
									<Skeleton className="h-5 w-24 mb-1" />
									<Skeleton className="h-5 w-40" />
								</div>
							</div>
						</div>

						<div className="bg-white rounded border border-gray-200 shadow-sm p-6">
							<Skeleton className="h-6 w-32 mb-4" />
							<div className="space-y-4">
								<div>
									<Skeleton className="h-5 w-24 mb-1" />
									<Skeleton className="h-5 w-40" />
								</div>
								<div>
									<Skeleton className="h-5 w-24 mb-1" />
									<Skeleton className="h-5 w-40" />
								</div>
								<div>
									<Skeleton className="h-5 w-24 mb-1" />
									<Skeleton className="h-5 w-40" />
								</div>
								<div>
									<Skeleton className="h-5 w-24 mb-1" />
									<Skeleton className="h-5 w-40" />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
