import { AdminJobActions } from "@/components/admin-job-actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useGetCurrentUserQuery, useGetJobQuery } from "@/lib/query";
import { ArrowLeft, Building2, Calendar, Clock, MapPin } from "lucide-react";
import { Link, useParams } from "react-router";

type JobPageParams = {
	id: string;
};

function StatusBadge({
	status,
}: { status: "pending" | "approved" | "rejected" | (string & {}) }) {
	switch (status) {
		case "pending":
			return (
				<Badge className="bg-[#fff8e6] text-[#946c00] border-[#946c00] hover:bg-[#fff8e6]">
					<Clock className="h-3.5 w-3.5 mr-1" />
					Pending Review
				</Badge>
			);
		case "approved":
			return (
				<Badge className="bg-[#e6f7ed] text-[#0a6c2e] border-[#0a6c2e] hover:bg-[#e6f7ed]">
					Approved
				</Badge>
			);
		case "rejected":
			return (
				<Badge className="bg-[#fbe9e9] text-[#c42b1c] border-[#c42b1c] hover:bg-[#fbe9e9]">
					Rejected
				</Badge>
			);
	}
}

export default function JobShowPage() {
	const params = useParams<JobPageParams>();
	const { data: job } = useGetJobQuery(Number(params.id));
	const { data: user } = useGetCurrentUserQuery();

	const backTo = user?.role === "admin" ? "/admin" : "/";
	if (!job) {
		return <h1>Not found</h1>;
	}

	return (
		<div className="min-h-screen bg-[#f3f2f1]">
			<div className="bg-white border-b border-gray-200 shadow-sm">
				<div className="container mx-auto py-6 px-4">
					<Link
						to={backTo}
						className="flex items-center text-[#2557a7] mb-2 hover:underline"
					>
						<ArrowLeft className="mr-2 h-4 w-4" />
						Back
					</Link>
				</div>
			</div>

			<div className="container mx-auto py-6 px-4">
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
					{/* Main job content */}
					<div className="lg:col-span-8">
						<div className="bg-white rounded border border-gray-200 shadow-sm p-6 mb-5">
							<div className="flex justify-between items-start mb-4">
								<div>
									<h2 className="text-2xl font-bold text-[#2d2d2d] mb-2">
										{job.name}
									</h2>
									<div className="flex items-center text-[#2557a7] font-semibold mb-1">
										<Building2 className="h-4 w-4 mr-1 flex-shrink-0" />
										<span>{job.subcompany}</span>
									</div>
								</div>
								{user?.role === "admin" && <StatusBadge status={job.status} />}
							</div>

							<div className="flex flex-wrap gap-4 text-[#595959] mb-4">
								<div className="flex items-center">
									<MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
									<span>{job.office}</span>
								</div>

								<div className="flex items-center">
									<Clock className="h-4 w-4 mr-1 flex-shrink-0" />
									<span>{job.schedule}</span>
								</div>

								<div className="flex items-center">
									<Calendar className="h-4 w-4 mr-1 flex-shrink-0" />
									<span>
										Posted {new Date(job.createdAt).toLocaleDateString()}
									</span>
								</div>
							</div>

							<div className="flex flex-wrap gap-2 mb-4">
								<Badge
									variant="outline"
									className="bg-[#f3f2f1] text-[#595959] hover:bg-[#f3f2f1] border-[#e4e2e0]"
								>
									{job.employmentType}
								</Badge>
								{job.seniority && (
									<Badge
										variant="outline"
										className="bg-[#f3f2f1] text-[#595959] hover:bg-[#f3f2f1] border-[#e4e2e0]"
									>
										{job.seniority}
									</Badge>
								)}
								<Badge
									variant="outline"
									className="bg-[#f3f2f1] text-[#595959] hover:bg-[#f3f2f1] border-[#e4e2e0]"
								>
									{job.department}
								</Badge>
							</div>

							<Separator className="my-6" />

							<div className="space-y-6">
								{job.jobDescriptions.map((section, index) => (
									<div key={index} className="space-y-3">
										<h3 className="text-xl font-semibold text-[#2d2d2d]">
											{section.name}
										</h3>
										<div
											className="prose max-w-none text-[#2d2d2d]"
											dangerouslySetInnerHTML={{ __html: section.value }}
										/>
									</div>
								))}
							</div>
						</div>
					</div>

					{/* Sidebar */}
					<div className="lg:col-span-4">
						{user?.role === "admin" && (
							<div className="bg-white rounded border border-gray-200 shadow-sm p-6 mb-5">
								<h2 className="text-xl font-semibold text-[#2d2d2d] mb-4">
									Admin Actions
								</h2>
								<AdminJobActions job={job} />
							</div>
						)}

						{user?.role === "admin" && (
							<div className="bg-white rounded border border-gray-200 shadow-sm p-6 mb-5">
								<h2 className="text-xl font-semibold text-[#2d2d2d] mb-4">
									Employer Information
								</h2>

								<div className="space-y-4">
									<div>
										<h3 className="text-sm font-semibold text-[#595959]">
											Company
										</h3>
										<p className="text-[#2d2d2d]">{job.subcompany}</p>
									</div>

									<div>
										<h3 className="text-sm font-semibold text-[#595959]">
											Contact Name
										</h3>
										<p className="text-[#2d2d2d]">
											{job?.createdBy?.name || "Not available"}
										</p>
									</div>

									<div>
										<h3 className="text-sm font-semibold text-[#595959]">
											Contact Email
										</h3>
										<p className="text-[#2d2d2d]">
											{job?.createdBy?.email || "Not available"}
										</p>
									</div>
								</div>
							</div>
						)}
						<div className="bg-white rounded border border-gray-200 shadow-sm p-6">
							<h2 className="text-xl font-semibold text-[#2d2d2d] mb-4">
								Job Details
							</h2>

							<div className="space-y-4">
								<div>
									<h3 className="text-sm font-semibold text-[#595959]">
										Department
									</h3>
									<p className="text-[#2d2d2d]">{job.department}</p>
								</div>

								<div>
									<h3 className="text-sm font-semibold text-[#595959]">
										Employment Type
									</h3>
									<p className="text-[#2d2d2d]">{job.employmentType}</p>
								</div>

								<div>
									<h3 className="text-sm font-semibold text-[#595959]">
										Experience
									</h3>
									<p className="text-[#2d2d2d]">{job.yearsOfExperience}</p>
								</div>

								<div>
									<h3 className="text-sm font-semibold text-[#595959]">
										Seniority
									</h3>
									<p className="text-[#2d2d2d]">{job.seniority}</p>
								</div>

								<div>
									<h3 className="text-sm font-semibold text-[#595959]">
										Keywords
									</h3>
									<div className="flex flex-wrap gap-2 mt-1">
										{job.keywords.map((keyword, index) => (
											<Badge
												key={index}
												variant="outline"
												className="bg-[#f3f2f1] text-[#595959] hover:bg-[#f3f2f1] border-[#e4e2e0]"
											>
												{keyword.trim()}
											</Badge>
										))}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
