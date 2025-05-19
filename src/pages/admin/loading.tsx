import { Skeleton } from "@/components/ui/skeleton";

export default function AdminLoading() {
	return (
		<div className="min-h-screen bg-[#f3f2f1]">
			<div className="bg-white border-b border-gray-200 shadow-sm">
				<div className="container mx-auto py-6 px-4">
					<Skeleton className="h-8 w-48 mb-1" />
					<Skeleton className="h-5 w-64" />
				</div>
			</div>

			<div className="container mx-auto py-6 px-4">
				<div className="bg-white rounded border border-gray-200 shadow-sm">
					<div className="p-4 border-b border-gray-200">
						<div className="grid grid-cols-4 mb-4 gap-2">
							<Skeleton className="h-10" />
							<Skeleton className="h-10" />
							<Skeleton className="h-10" />
							<Skeleton className="h-10" />
						</div>

						<div className="overflow-x-auto">
							<table className="w-full border-collapse">
								<thead>
									<tr className="bg-[#f9f9f9]">
										<th className="px-4 py-3 text-left">
											<Skeleton className="h-5 w-24" />
										</th>
										<th className="px-4 py-3 text-left">
											<Skeleton className="h-5 w-24" />
										</th>
										<th className="px-4 py-3 text-left">
											<Skeleton className="h-5 w-24" />
										</th>
										<th className="px-4 py-3 text-left">
											<Skeleton className="h-5 w-24" />
										</th>
										<th className="px-4 py-3 text-left">
											<Skeleton className="h-5 w-24" />
										</th>
										<th className="px-4 py-3 text-left">
											<Skeleton className="h-5 w-24" />
										</th>
									</tr>
								</thead>
								<tbody className="divide-y divide-gray-200">
									{Array.from({ length: 5 }).map((_, index) => (
										<tr key={index}>
											<td className="px-4 py-4">
												<div className="flex flex-col">
													<Skeleton className="h-5 w-40 mb-1" />
													<Skeleton className="h-4 w-24" />
												</div>
											</td>
											<td className="px-4 py-4">
												<div className="flex items-center">
													<Skeleton className="h-4 w-4 mr-1" />
													<Skeleton className="h-4 w-32" />
												</div>
											</td>
											<td className="px-4 py-4">
												<div className="flex items-center">
													<Skeleton className="h-4 w-4 mr-1" />
													<Skeleton className="h-4 w-32" />
												</div>
											</td>
											<td className="px-4 py-4">
												<div className="flex items-center">
													<Skeleton className="h-4 w-4 mr-1" />
													<Skeleton className="h-4 w-32" />
												</div>
											</td>
											<td className="px-4 py-4">
												<Skeleton className="h-6 w-24" />
											</td>
											<td className="px-4 py-4">
												<div className="flex items-center space-x-2">
													<Skeleton className="h-8 w-20" />
													<Skeleton className="h-8 w-8" />
												</div>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
