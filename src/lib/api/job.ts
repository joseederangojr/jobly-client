import { z } from "zod";
import { HTTPError } from "ky";
import { api } from "./ky";
import type { ValidationError } from "@/lib/errors";
import type { Job, Paginated } from "@/lib/types";

export const getJobs = (searchParams: URLSearchParams) => {
	return api
		.get("job-ad", {
			searchParams,
		})
		.json<Paginated<Job>>();
};
