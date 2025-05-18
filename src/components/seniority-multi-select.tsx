import { MultiSelect } from "./ui/multiselect";

const seniorities = ["Entry", "Mid-Level", "Senior"].map((seniority) => ({
	label: seniority,
	value: seniority.toLowerCase(),
}));

interface SeniorityMultiSelectProps
	extends Omit<React.ComponentPropsWithoutRef<typeof MultiSelect>, "options"> {}

export const SeniorityMultiSelect = (props: SeniorityMultiSelectProps) => {
	return (
		<MultiSelect
			options={seniorities}
			placeholder="Select seniority"
			variant="inverted"
			maxCount={1}
			{...props}
		/>
	);
};
