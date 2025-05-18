import ky from "ky";
import {
	requestToSnakeCase,
	responseToCamelCase,
	// @ts-ignore
} from "@alice-health/ky-hooks-change-case";
export const api = ky.extend({
	prefixUrl: import.meta.env.VITE_APP_API_ENDPOINT,
	mode: "cors",
	hooks: {
		beforeRequest: [requestToSnakeCase],
		afterResponse: [responseToCamelCase],
	},
});
