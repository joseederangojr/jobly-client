import { MultiSelect } from "./ui/multiselect";

const departments = [
	"Software Engineering",
	"Product Management",
	"Design",
	"Marketing",
	"Sales",
].map((department) => ({
	label: department,
	value: department.toLowerCase(),
}));

interface DepartmentMultiSelectProps
	extends Omit<React.ComponentPropsWithoutRef<typeof MultiSelect>, "options"> {}

export const DepartmentMultiSelect = (props: DepartmentMultiSelectProps) => {
	return (
		<MultiSelect
			options={departments}
			placeholder="Select department"
			variant="inverted"
			maxCount={1}
			{...props}
		/>
	);
};
