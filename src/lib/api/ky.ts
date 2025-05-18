import {
	requestToSnakeCase,
	responseToCamelCase,
	// @ts-ignore
} from "@alice-health/ky-hooks-change-case";
import ky from "ky";
export const api = ky.extend({
	prefixUrl: import.meta.env.VITE_APP_API_ENDPOINT,
	mode: "cors",
	hooks: {
		beforeRequest: [requestToSnakeCase],
		afterResponse: [responseToCamelCase],
	},
});
