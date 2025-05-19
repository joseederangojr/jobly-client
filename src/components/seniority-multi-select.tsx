import { useQuery } from "@tanstack/react-query";
import { MultiSelect } from "./ui/multiselect";
import { createGetJobOptionsQuery } from "@/lib/query";

interface SeniorityMultiSelectProps
	extends Omit<React.ComponentPropsWithoutRef<typeof MultiSelect>, "options"> {}

export const SeniorityMultiSelect = (props: SeniorityMultiSelectProps) => {
	const { isLoading, data } = useQuery({
		...createGetJobOptionsQuery(),
		select: (data) =>
			data.seniority.map((label) => ({
				label: `${label} Level`,
				value: label.toLowerCase(),
			})),
	});
	return (
		<MultiSelect
			disabled={isLoading}
			options={data}
			placeholder="Seniority"
			variant="inverted"
			maxCount={1}
			{...props}
		/>
	);
};
