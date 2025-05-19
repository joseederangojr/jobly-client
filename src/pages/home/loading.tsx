import { Skeleton } from "@/components/ui/skeleton";
import { Loader2 } from "lucide-react";

export default function HomeLoading() {
	return (
		<div className="min-h-screen bg-[#f3f2f1]">
			{/* Header skeleton */}
			<div className="bg-white border-b border-gray-200 shadow-sm">
				<div className="container mx-auto py-4 px-4">
					<div className="flex flex-col gap-4">
						<div className="flex items-center justify-between">
							<Skeleton className="h-8 w-32" />
							<Skeleton className="h-10 w-28" />
						</div>
						<div className="flex flex-col sm:flex-row gap-2">
							<Skeleton className="h-12 flex-1" />
							<Skeleton className="h-12 flex-1" />
							<Skeleton className="h-12 w-24" />
						</div>
						<div className="flex flex-wrap gap-2 items-center">
							<Skeleton className="h-10 w-32" />
							<Skeleton className="h-10 w-32" />
							<Skeleton className="h-10 w-32" />
							<Skeleton className="h-10 w-32" />
						</div>
					</div>
				</div>
			</div>
			{/* Main content skeleton */}
			<div className="container mx-auto py-6 px-4">
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
					{/* Job listings skeleton */}
					<div className="lg:col-span-12">
						<div className="bg-white rounded border border-gray-200 shadow-sm">
							<div className="p-4 border-b border-gray-200">
								<Skeleton className="h-6 w-32" />
							</div>

							{/* Job cards skeleton */}
							<div className="divide-y divide-gray-200">
								{Array.from({ length: 5 }).map((_, index) => (
									<div key={index} className="p-4">
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
						</div>
					</div>
				</div>
			</div>{" "}
		</div>
	);
}
