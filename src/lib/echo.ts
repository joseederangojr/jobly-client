import { configureEcho } from "@laravel/echo-react";

const token = window.localStorage.getItem("token");

configureEcho({
	broadcaster: "pusher",
	authEndpoint: `${import.meta.env.VITE_APP_API_ENDPOINT}/broadcasting/auth`,
	bearerToken: token,
	key: import.meta.env.VITE_PUSHER_APP_KEY,
	cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
	forceTLS: import.meta.env.PROD,
	wsHost: import.meta.env.VITE_PUSHER_HOST,
	wsPort: Number.parseInt(import.meta.env.VITE_PUSHER_PORT || "0"),
	wssPort: Number.parseInt(import.meta.env.VITE_PUSHER_PORT || "0"),
	enabledTransports: ["ws", "wss"],
});
