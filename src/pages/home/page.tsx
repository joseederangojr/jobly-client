import { JobDetailPanel } from "@/components/job-detail-panel";
import { JobFilters } from "@/components/job-filters";
import { JobList } from "@/components/job-list";
import { SearchBar } from "@/components/search-bar";
import { Button } from "@/components/ui/button";
import type { Job } from "@/lib/types";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

export default function HomePage() {
	const [selectedJob, setSelectedJob] = useState<Job | null>(null);
	return (
		<div className="min-h-screen bg-[#f3f2f1]">
			<div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
				<div className="container mx-auto py-4 px-4">
					<div className="flex flex-col gap-4">
						<div className="flex items-center justify-between">
							<h1 className="text-2xl font-bold text-[#2d2d2d]">Job Search</h1>
							<Link to="/job/create">
								<Button className="bg-[#2557a7] hover:bg-[#1f4b8f] text-white">
									<PlusIcon className="mr-2 h-4 w-4" /> Post a job
								</Button>
							</Link>
						</div>
						<SearchBar />
						<JobFilters />
					</div>
				</div>
			</div>
			<div className="container mx-auto py-6 px-4">
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
					<div
						className={`${selectedJob ? "lg:col-span-7" : "lg:col-span-12"} order-1 ${selectedJob ? "hidden lg:block" : ""}`}
					>
						<div className="bg-white rounded border border-gray-200 shadow-sm">
							<div className="p-4 border-b border-gray-200">
								<h2 className="text-lg font-semibold text-[#2d2d2d]">
									Job Results
								</h2>
							</div>
							<JobList
								onSelectJob={setSelectedJob}
								selectedJobId={selectedJob?.id || null}
							/>
						</div>
					</div>
					{selectedJob && (
						<div className="lg:col-span-5 order-2 h-[calc(100vh-180px)] lg:h-auto">
							<div className="bg-white rounded border border-gray-200 shadow-sm h-full">
								<JobDetailPanel
									job={selectedJob}
									onClose={() => setSelectedJob(null)}
								/>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
