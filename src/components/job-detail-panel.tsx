"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
	ArrowLeft,
	ArrowUpRight,
	Briefcase,
	Building2,
	Clock,
	MapPin,
	Share2,
	Bookmark,
	X,
} from "lucide-react";
import { Link } from "react-router";
import type { Job } from "@/lib/types";

interface JobDetailPanelProps {
	job: Job;
	onClose: () => void;
}

export function JobDetailPanel({ job, onClose }: JobDetailPanelProps) {
	return (
		<div className="h-full flex flex-col bg-white border-l border-gray-200">
			<div className="p-4 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white z-10">
				<Button
					variant="ghost"
					size="sm"
					onClick={onClose}
					className="text-[#595959]"
				>
					<ArrowLeft className="h-4 w-4 mr-2" />
					Back to results
				</Button>
				<Link to={`/job/${job.id}`} target="_blank">
					<Button variant="ghost" size="sm" className="text-[#2557a7]">
						View full page
						<ArrowUpRight className="h-4 w-4 ml-2" />
					</Button>
				</Link>
				<Button
					variant="ghost"
					size="icon"
					onClick={onClose}
					className="lg:hidden"
				>
					<X className="h-5 w-5" />
				</Button>
			</div>

			<ScrollArea className="flex-1">
				<div className="p-6">
					<h1 className="text-2xl font-bold text-[#2d2d2d] mb-2">{job.name}</h1>

					<div className="flex items-center text-[#2557a7] font-semibold mb-3">
						<Building2 className="h-4 w-4 mr-1 flex-shrink-0" />
						<span>{job.subcompany}</span>
					</div>

					<div className="flex items-center text-[#595959] mb-4">
						<MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
						<span className="mr-4">{job.office}</span>

						{job.schedule && (
							<>
								<Clock className="h-4 w-4 mr-1 flex-shrink-0 ml-2" />
								<span>{job.schedule}</span>
							</>
						)}
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

					<div className="flex gap-2 mb-6">
						<Button className="bg-[#2557a7] hover:bg-[#1f4b8f] text-white">
							Apply now
						</Button>
						<Button
							variant="outline"
							className="border-[#e4e2e0] text-[#595959]"
						>
							<Bookmark className="mr-2 h-4 w-4" /> Save job
						</Button>
						<Button
							variant="outline"
							className="border-[#e4e2e0] text-[#595959]"
						>
							<Share2 className="mr-2 h-4 w-4" /> Share
						</Button>
					</div>

					<Separator className="my-6" />

					<div className="space-y-6">
						<div className="text-sm text-[#767676]">
							Posted {new Date(job.createdAt).toLocaleDateString()} ·{" "}
							{job.yearsOfExperience} experience
						</div>

						{job.jobDescriptions.map((section, index) => (
							<div key={index} className="space-y-3">
								<h2 className="text-xl font-semibold text-[#2d2d2d]">
									{section.name}
								</h2>
								<div
									className="prose max-w-none text-[#2d2d2d]"
									dangerouslySetInnerHTML={{ __html: section.value }}
								/>
							</div>
						))}
					</div>

					<Separator className="my-6" />

					<div className="space-y-4">
						<h2 className="text-xl font-semibold text-[#2d2d2d]">
							Job details
						</h2>

						<div className="flex items-start">
							<Briefcase className="h-5 w-5 text-[#595959] mr-3 mt-0.5" />
							<div>
								<h3 className="font-semibold text-[#2d2d2d]">Job type</h3>
								<p className="text-[#595959]">{job.employmentType}</p>
							</div>
						</div>

						<div className="flex items-start">
							<Clock className="h-5 w-5 text-[#595959] mr-3 mt-0.5" />
							<div>
								<h3 className="font-semibold text-[#2d2d2d]">Schedule</h3>
								<p className="text-[#595959]">{job.schedule}</p>
							</div>
						</div>

						<div className="flex items-start">
							<MapPin className="h-5 w-5 text-[#595959] mr-3 mt-0.5" />
							<div>
								<h3 className="font-semibold text-[#2d2d2d]">Location</h3>
								<p className="text-[#595959]">{job.office}</p>
							</div>
						</div>
					</div>

					<Separator className="my-6" />

					<div className="space-y-4">
						<h2 className="text-xl font-semibold text-[#2d2d2d]">
							Skills and expertise
						</h2>

						<div className="flex flex-wrap gap-2">
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
			</ScrollArea>
		</div>
	);
}
