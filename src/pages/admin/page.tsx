"use client";

import { JobList } from "@/pages/admin/job-list";
export default function AdminDashboardPage() {
	return (
		<div className="min-h-screen bg-[#f3f2f1]">
			<div className="bg-white border-b border-gray-200 shadow-sm">
				<div className="container mx-auto py-6 px-4">
					<h1 className="text-2xl font-bold text-[#2d2d2d]">Admin Dashboard</h1>
					<p className="text-[#595959] mt-1">
						Manage job postings and approvals
					</p>
				</div>
			</div>

			<div className="container mx-auto py-6 px-4">
				<div className="bg-white rounded border border-gray-200 shadow-sm">
					<div className="p-4 border-b border-gray-200">
						<div className="flex justify-between items-center mb-4">
							<h2 className="text-lg font-semibold text-[#2d2d2d]">
								Job Listings
							</h2>
						</div>
						<JobList />
					</div>
				</div>
			</div>
		</div>
	);
}
