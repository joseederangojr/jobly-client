import { CreateJobForm } from "@/components/create-job-form";
import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";

export default function CreateJobPage() {
	return (
		<div className="min-h-screen bg-[#f3f2f1]">
			<div className="container mx-auto py-8 px-4 max-w-4xl">
				<Link
					to="/"
					className="flex items-center text-[#2557a7] mb-6 hover:underline"
				>
					<ArrowLeft className="mr-2 h-4 w-4" />
					Back to job search
				</Link>

				<div className="bg-white rounded border border-gray-200 shadow-sm p-6">
					<h1 className="text-2xl font-bold text-[#2d2d2d] mb-4">
						Create New Job Posting
					</h1>
					<p className="text-[#595959] mb-8">
						Fill out the form below to create a new job posting. Fields marked
						with an asterisk (*) are required.
					</p>
					<CreateJobForm />
				</div>
			</div>
		</div>
	);
}
