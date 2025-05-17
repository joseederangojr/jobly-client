import ky from "ky";
export const api = ky.extend({
	prefixUrl: import.meta.env.VITE_APP_API_ENDPOINT,
	mode: "cors",
	hooks: {
		beforeRequest: [
			(request) => {
				const token = window.localStorage.getItem("token");
				if (token) {
					request.headers.set("Authorization", `Bearer ${token}`);
				}
			},
		],
	},
});
