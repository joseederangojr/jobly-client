import { Skeleton } from "@/components/ui/skeleton";

export default function CreateJobLoading() {
	return (
		<div className="min-h-screen bg-[#f3f2f1]">
			<div className="container mx-auto py-8 px-4 max-w-4xl">
				<Skeleton className="h-6 w-40 mb-6" />

				<div className="bg-white rounded border border-gray-200 shadow-sm p-6">
					<Skeleton className="h-8 w-64 mb-4" />
					<Skeleton className="h-5 w-full mb-8" />

					<div className="space-y-8">
						<div className="space-y-6">
							<Skeleton className="h-6 w-40" />

							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div className="space-y-2">
									<Skeleton className="h-5 w-24" />
									<Skeleton className="h-10 w-full" />
								</div>
								<div className="space-y-2">
									<Skeleton className="h-5 w-24" />
									<Skeleton className="h-10 w-full" />
								</div>
								<div className="space-y-2">
									<Skeleton className="h-5 w-24" />
									<Skeleton className="h-10 w-full" />
								</div>
								<div className="space-y-2">
									<Skeleton className="h-5 w-24" />
									<Skeleton className="h-10 w-full" />
								</div>
							</div>
						</div>

						<Skeleton className="h-px w-full" />

						<div className="space-y-6">
							<Skeleton className="h-6 w-40" />

							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div className="space-y-2">
									<Skeleton className="h-5 w-24" />
									<Skeleton className="h-10 w-full" />
								</div>
								<div className="space-y-2">
									<Skeleton className="h-5 w-24" />
									<Skeleton className="h-10 w-full" />
								</div>
								<div className="space-y-2">
									<Skeleton className="h-5 w-24" />
									<Skeleton className="h-10 w-full" />
								</div>
								<div className="space-y-2">
									<Skeleton className="h-5 w-24" />
									<Skeleton className="h-10 w-full" />
								</div>
							</div>
						</div>

						<Skeleton className="h-px w-full" />

						<div className="space-y-6">
							<div className="flex items-center justify-between">
								<Skeleton className="h-6 w-40" />
								<Skeleton className="h-8 w-28" />
							</div>

							<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
								<div className="md:col-span-1">
									<div className="space-y-1">
										<Skeleton className="h-8 w-full" />
										<Skeleton className="h-8 w-full" />
										<Skeleton className="h-8 w-full" />
									</div>
								</div>

								<div className="md:col-span-3">
									<div className="space-y-4">
										<div className="flex items-center justify-between">
											<div className="space-y-2 flex-1">
												<Skeleton className="h-5 w-24" />
												<Skeleton className="h-10 w-full" />
											</div>
											<Skeleton className="h-9 w-9 mt-8" />
										</div>

										<div className="space-y-2">
											<Skeleton className="h-5 w-24" />
											<Skeleton className="h-[200px] w-full" />
										</div>
									</div>
								</div>
							</div>
						</div>

						<div className="flex justify-end gap-4 pt-4">
							<Skeleton className="h-10 w-24" />
							<Skeleton className="h-10 w-40" />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
