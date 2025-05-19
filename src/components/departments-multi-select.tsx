import { createGetJobOptionsQuery, useGetJobOptionsQuery } from "@/lib/query";
import { MultiSelect } from "./ui/multiselect";
import { useQuery } from "@tanstack/react-query";

interface DepartmentMultiSelectProps
	extends Omit<React.ComponentPropsWithoutRef<typeof MultiSelect>, "options"> {}

export const DepartmentMultiSelect = (props: DepartmentMultiSelectProps) => {
	const { isLoading, data } = useQuery({
		...createGetJobOptionsQuery(),
		select: (data) =>
			data.department.map((label) => ({
				label: label,
				value: label.toLowerCase(),
			})),
		initialData: { department: [], seniority: [] },
	});
	return (
		<MultiSelect
			disabled={isLoading}
			options={data}
			placeholder="Department"
			variant="inverted"
			maxCount={1}
			{...props}
		/>
	);
};
