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
				<div className="flex justify-center items-center py-12">
					<Loader2 className="h-12 w-12 text-[#2557a7] animate-spin" />
				</div>
			</div>
		</div>
	);
}
