export type ValidationError<D = { [key: string]: any }> = {
	message: string;
	errors: { [K in keyof D]: string[] };
};
