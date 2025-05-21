export type User = {
	id: number;
	name: string;
	email: string;
	role: string;
	notifications?: Notification[];
	createdAt: Date;
	updatedAt: Date;
	deletedAt?: Date;
};

type JobDescription = {
	name: string;
	value: string;
};
export type Job = {
	id: number;
	name: string;
	subcompany: string;
	office: string;
	department: string;
	recruitingCategory: string;
	employmentType: string;
	seniority: string;
	schedule: string;
	yearsOfExperience: string;
	keywords: string[];
	occupation: string;
	occupationCategory: string;
	jobDescriptions: JobDescription[];
	status: string;
	createdAt: Date;
	createdById: number;
	createdBy?: User;
	updatedAt: Date;
	updatedById: number;
	updatedBy?: User;
	deletedAt?: Date;
	deletedById?: number;
	deletedBy?: User;
};

type PaginatedLink = {
	url: string | null;
	label: string;
	active: boolean;
};
export type Paginated<D> = {
	data: D[];
	currentPage: number;
	firstPageUrl: string | null;
	from: number;
	lastPage: number;
	lastPageUrl: string | null;
	links: PaginatedLink[];
	nextPageUrl: string | null;
	path: string;
	perPage: number;
	prevPageUrl: string | null;
	to: number;
	total: number;
};

export type Notification = {
	id: string;
	notifiableType: string;
	notifiableId: number;
	job: Job;
	employer: User;
	readAt: Date;
	createdAt: Date;
	updatedAt: Date;
};
