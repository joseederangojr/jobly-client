import type { ValidationError } from "@/lib/errors";
import type { Job, Paginated } from "@/lib/types";
import { HTTPError } from "ky";
import { z } from "zod";
import { api } from "./ky";

export const getJobs = (searchParams: URLSearchParams) => {
	return api
		.get("job-ad", {
			searchParams,
		})
		.json<Paginated<Job>>();
};

export const getJob = (id: number) => {
	return api.get(`job-ad/${id}`).json<Job>();
};

export const createJobSchema = z.object({
	name: z
		.string()
		.min(5, { message: "Job title must be at least 5 characters" }),
	subcompany: z.string().min(2, { message: "Company name is required" }),
	office: z.string().min(2, { message: "Office location is required" }),
	department: z.string().min(2, { message: "Department is required" }),
	recruitingCategory: z
		.string()
		.min(2, { message: "Recruiting category is required" }),
	employmentType: z.string().min(2, { message: "Employment type is required" }),
	seniority: z.string().min(2, { message: "Seniority level is required" }),
	schedule: z.string().min(2, { message: "Schedule is required" }),
	yearsOfExperience: z
		.string()
		.min(2, { message: "Years of experience is required" }),
	keywords: z.string().min(2, { message: "Keywords are required" }),
	occupation: z.string().min(2, { message: "Occupation is required" }),
	occupationCategory: z
		.string()
		.min(2, { message: "Occupation category is required" }),
	jobDescriptions: z
		.array(
			z.object({
				name: z.string().min(2, { message: "Section title is required" }),
				value: z.string().min(10, { message: "Section content is required" }),
			}),
		)
		.min(1, { message: "At least one job description section is required" }),
});

export type CreateJobData = z.infer<typeof createJobSchema>;
export type CreateJobResult = Job;
export type CreateJobError = ValidationError<CreateJobData>;
export const createJob = async (data: CreateJobData) => {
	try {
		return api
			.post("job-ad", {
				json: {
					...data,
					keywords: data.keywords.split(",").map((x) => x.trim()),
				},
			})
			.json<CreateJobResult>();
	} catch (err) {
		if (err instanceof HTTPError) {
			throw await err.response.json();
		}

		throw err;
	}
};

export const approveJob = async (id: number) => {
	try {
		return await api.patch(`job-ad/${id}/approve`).json<CreateJobResult>();
	} catch (err) {
		if (err instanceof HTTPError) {
			throw await err.response.json();
		}

		throw err;
	}
};

export const rejectJob = async (id: number) => {
	try {
		return await api.patch(`job-ad/${id}/reject`).json<CreateJobResult>();
	} catch (err) {
		if (err instanceof HTTPError) {
			throw await err.response.json();
		}

		throw err;
	}
};

type GetJobOptionsResult = {
	department: string[];
	seniority: string[];
};
export const getJobOptions = () => {
	return api.get("job-ad/options").json<GetJobOptionsResult>();
};
