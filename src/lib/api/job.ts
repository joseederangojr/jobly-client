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
