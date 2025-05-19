import * as Home from "./home";

export default function HomePage() {
	return (
		<Home.Root>
			<Home.Search>
				<Home.SearchHeader>
					<Home.SearchHeaderTitle />
					<Home.SearchHeaderAction />
				</Home.SearchHeader>
				<Home.SearchBar />
				<Home.SearchFilter />
			</Home.Search>
			<Home.Content>
				<Home.JobResult>
					<Home.JobHeader />
					<Home.JobList />
				</Home.JobResult>
				<Home.JobOverview>
					<Home.JobDetailPanel />
				</Home.JobOverview>
			</Home.Content>
		</Home.Root>
	);
}
