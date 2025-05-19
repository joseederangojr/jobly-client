import * as React from "react";
import { PlusIcon } from "lucide-react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { useGetCurrentUserQuery } from "@/lib/query";
import type { Job } from "@/lib/types";
import { cn } from "@/lib/utils";
import { JobList } from "./job-list";
import { SearchBar } from "./search-bar";
import { SearchFilter } from "./search-filter";
import { JobDetailPanel } from "./job-detail-panel";

type HomeContextProps = {
	selectedJob?: Job;
	setSelectedJob?: (job?: Job) => void;
};
const HomeContext = React.createContext<HomeContextProps>({});

export const useHomeContext = () => {
	const ctx = React.use(HomeContext);
	if (!ctx)
		throw new Error(
			"`useHomeContext` should be used inside `HomeContext.Provider`",
		);
	return ctx;
};

const Root = (props: React.PropsWithChildren) => {
	const [selectedJob, setSelectedJob] = React.useState<Job>();
	const ctx = React.useMemo(() => {
		return { selectedJob, setSelectedJob };
	}, [selectedJob]);
	return (
		<HomeContext.Provider value={ctx}>
			<div className="min-h-screen bg-[#f3f2f1]">{props.children}</div>
		</HomeContext.Provider>
	);
};
const SearchHeader = (props: React.PropsWithChildren) => {
	return (
		<div className="flex items-center justify-between">{props.children}</div>
	);
};

const SearchHeaderTitle = (props: React.PropsWithChildren) => (
	<h1 className="text-2xl font-bold text-[#2d2d2d]">
		{props.children ?? "Job Search"}
	</h1>
);
const SearchHeaderAction = () => {
	const { isLoading, data } = useGetCurrentUserQuery();
	if (isLoading) return;
	return (
		data.role === "employer" && (
			<Link to="/job/create">
				<Button className="bg-[#2557a7] hover:bg-[#1f4b8f] text-white">
					<PlusIcon className="mr-2 h-4 w-4" /> Post a job
				</Button>
			</Link>
		)
	);
};

const Search = (props: React.PropsWithChildren) => {
	return (
		<div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
			<div className="container mx-auto py-4 px-4">
				<div className="flex flex-col gap-4">{props.children}</div>
			</div>
		</div>
	);
};

const Content = (props: React.PropsWithChildren) => {
	return (
		<div className="container mx-auto py-6 px-4">
			<div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
				{props.children}
			</div>
		</div>
	);
};

const JobResult = (props: React.PropsWithChildren) => {
	const { selectedJob } = useHomeContext();
	return (
		<div
			className={cn(
				selectedJob ? "lg:col-span-7" : "lg:col-span-12",
				"order-1",
				selectedJob ? "hidden lg:block" : "",
			)}
		>
			<div className="bg-white rounded border border-gray-200 shadow-sm">
				{props.children}
			</div>
		</div>
	);
};

const JobHeader = () => {
	return (
		<div className="p-4 border-b border-gray-200">
			<h2 className="text-lg font-semibold text-[#2d2d2d]">Job Results</h2>
		</div>
	);
};
const JobOverview = (props: React.PropsWithChildren) => {
	return (
		<div className="lg:col-span-5 order-2 h-[calc(100vh-180px)] lg:h-auto">
			<div className="bg-white rounded border border-gray-200 shadow-sm h-full">
				{props.children}
			</div>
		</div>
	);
};

export {
	Root,
	Search,
	SearchHeader,
	SearchHeaderTitle,
	SearchHeaderAction,
	SearchBar,
	SearchFilter,
	Content,
	JobResult,
	JobHeader,
	JobList,
	JobOverview,
	JobDetailPanel,
};
