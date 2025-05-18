export type ValidationError<D = { [key: string]: any }> = {
	message: string;
	errors: { [K in keyof D]: string[] };
};

export const mapToFormErrors = <D = { [key: string]: any }>({
	errors,
}: ValidationError<D>) => {
	return Object.keys(errors).reduce(
		(acc, key) => ({
			...acc,
			[key]: errors?.[key].map((message: string) => ({ message })),
		}),
		{},
	);
};
