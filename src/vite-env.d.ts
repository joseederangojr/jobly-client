/// <reference types="vite/client" />

interface ViteTypeOptions {
	// By adding this line, you can make the type of ImportMetaEnv strict
	// to disallow unknown keys.
	strictImportMetaEnv: unknown;
}

interface ImportMetaEnv {
	readonly VITE_APP_API_ENDPOINT: string;
	readonly VITE_APP_NAME: string;
	readonly VITE_PUSHER_APP_KEY: string;
	readonly VITE_PUSHER_APP_CLUSTER: string;
	readonly VITE_PUSHER_HOST: string;
	readonly VITE_PUSHER_PORT: string;
	readonly VITE_PUSHER_SCHEME: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
