import {
	requestToSnakeCase,
	responseToCamelCase,
	// @ts-ignore
} from "@alice-health/ky-hooks-change-case";
import ky, { type KyRequest } from "ky";
const attachAccessToken = (request: KyRequest) => {
	const token = window.localStorage.getItem("token");

	if (token) {
		request.headers.set("Authorization", `Bearer ${token}`);
	}
};
export const api = ky.extend({
	prefixUrl: import.meta.env.VITE_APP_API_ENDPOINT,
	mode: "cors",
	hooks: {
		beforeRequest: [attachAccessToken, requestToSnakeCase],
		afterResponse: [responseToCamelCase],
	},
});
