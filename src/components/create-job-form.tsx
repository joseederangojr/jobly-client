"use client";

import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { RichTextEditor } from "@/components/rich-text-editor";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import { Plus, Trash2, MoveUp, MoveDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppForm } from "./ui/form";
import { useMutation } from "@tanstack/react-query";
import {
	createJob,
	createJobSchema,
	type CreateJobData,
	type CreateJobError,
	type CreateJobResult,
} from "@/lib/api/job";
import { mapToFormErrors } from "@/lib/errors";

// Form schema with dynamic job descriptions

const employmentTypeOptions = [
	"Permanent",
	"Part-time",
	"Temporary",
	"Contract",
	"Freelance",
	"Internship",
	"Seasonal",
	"On-Call",
].map((label) => ({
	label,
	value: label.toLowerCase(),
}));

const seniorityOptions = ["Experienced", "Senior", "Middle", "Entry"].map(
	(label) => ({
		label: `${label} Level`,
		value: label.toLowerCase(),
	}),
);

const scheduleOptions = ["Full-time", "Part-time", "Flexible", "Fixed"].map(
	(label) => ({
		label,
		value: label.toLowerCase(),
	}),
);

const yearsOfExperienceOptions = [
	"0-1",
	"1-3",
	"3-5",
	"5-8",
	"8-10",
	"10-15",
].map((label) => ({
	label: `${label} years`,
	value: label.toLowerCase(),
}));

export function CreateJobForm() {
	const navigate = useNavigate();
	const [activeSection, setActiveSection] = useState(0);

	const createJobMutation = useMutation<
		CreateJobResult,
		CreateJobError,
		CreateJobData
	>({
		mutationFn: (data) => createJob(data),
	});

	// Default values for the form
	const defaultValues: CreateJobData = {
		name: "",
		subcompany: "",
		office: "",
		department: "",
		recruitingCategory: "",
		employmentType: "",
		seniority: "",
		schedule: "",
		yearsOfExperience: "",
		keywords: "",
		occupation: "",
		occupationCategory: "",
		jobDescriptions: [{ name: "", value: "" }],
	};

	const form = useAppForm({
		defaultValues,
		onSubmit({ value, formApi }) {
			const data = createJobSchema.safeParse(value);
			if (data.error) {
				formApi.setErrorMap({
					onSubmit: {
						fields: data.error.flatten().fieldErrors,
					},
				});
				return;
			}
			createJobMutation.mutate(value, {
				onError(error) {
					formApi.setErrorMap({
						onSubmit: {
							fields: mapToFormErrors(error),
						},
					});
					toast.error("Create job failed", {
						description: error.message,
					});
				},
				onSuccess(data) {
					toast.success("Create job successful", {
						duration: 1000,
						onAutoClose: () => navigate(`/job/${data.id}`),
					});
				},
			});
		},
	});

	async function handleSubmit(event: React.FormEvent) {
		event.preventDefault();
		event.stopPropagation();
		form.handleSubmit();
	}

	return (
		<form onSubmit={handleSubmit} className="space-y-8">
			<div className="space-y-6">
				<h2 className="text-lg font-semibold text-[#2d2d2d]">
					Basic Information
				</h2>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<form.AppField
						name="name"
						children={(field) => (
							<field.FormInput
								label="Job Title *"
								placeholder="e.g. Senior Frontend Developer"
								className="border-[#e4e2e0] focus-visible:ring-[#2557a7]"
								value={field.state.value}
								onChange={(e) => field.handleChange(e.target.value)}
							/>
						)}
					/>

					<form.AppField
						name="subcompany"
						children={(field) => (
							<field.FormInput
								label="Company *"
								placeholder="mrge"
								className="border-[#e4e2e0] focus-visible:ring-[#2557a7]"
								value={field.state.value}
								onChange={(e) => field.handleChange(e.target.value)}
							/>
						)}
					/>
					<form.AppField
						name="department"
						children={(field) => (
							<field.FormInput
								label="Department *"
								placeholder="Engineering"
								className="border-[#e4e2e0] focus-visible:ring-[#2557a7]"
								value={field.state.value}
								onChange={(e) => field.handleChange(e.target.value)}
							/>
						)}
					/>
					<form.AppField
						name="office"
						children={(field) => (
							<field.FormInput
								label="Office *"
								placeholder="Remote"
								className="border-[#e4e2e0] focus-visible:ring-[#2557a7]"
								value={field.state.value}
								onChange={(e) => field.handleChange(e.target.value)}
							/>
						)}
					/>
				</div>
				<Separator className="my-6" />

				<div className="space-y-6">
					<h2 className="text-lg font-semibold text-[#2d2d2d]">Job Details</h2>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<form.AppField
							name="employmentType"
							children={(field) => (
								<field.FormSelect
									label="Employment Type *"
									placeholder="Select Employment Type"
									value={field.state.value}
									onChange={(value) => field.handleChange(value)}
									options={employmentTypeOptions}
								/>
							)}
						/>
						<form.AppField
							name="seniority"
							children={(field) => (
								<field.FormSelect
									label="Seniority *"
									placeholder="Select Seniority"
									value={field.state.value}
									onChange={(value) => field.handleChange(value)}
									options={seniorityOptions}
								/>
							)}
						/>

						<form.AppField
							name="schedule"
							children={(field) => (
								<field.FormSelect
									label="Schedule *"
									placeholder="Select Schedule"
									value={field.state.value}
									onChange={(value) => field.handleChange(value)}
									options={scheduleOptions}
								/>
							)}
						/>
						<form.AppField
							name="yearsOfExperience"
							children={(field) => (
								<field.FormSelect
									label="Years of Experience *"
									placeholder="Select Years of Experience"
									value={field.state.value}
									onChange={(value) => field.handleChange(value)}
									options={yearsOfExperienceOptions}
								/>
							)}
						/>
						<form.AppField
							name="recruitingCategory"
							children={(field) => (
								<field.FormInput
									label="Recruiting Category *"
									placeholder="Technical"
									value={field.state.value}
									onChange={(event) => field.handleChange(event.target.value)}
								/>
							)}
						/>

						<form.AppField
							name="occupationCategory"
							children={(field) => (
								<field.FormInput
									label="Occupation Category *"
									placeholder="IT and Software"
									value={field.state.value}
									onChange={(event) => field.handleChange(event.target.value)}
								/>
							)}
						/>

						<form.AppField
							name="occupation"
							children={(field) => (
								<field.FormInput
									label="Occupation *"
									placeholder="Software Development"
									value={field.state.value}
									onChange={(event) => field.handleChange(event.target.value)}
								/>
							)}
						/>

						<form.AppField
							name="keywords"
							children={(field) => (
								<field.FormInput
									label="Keywords *"
									placeholder="SQL,Python ,Java,Scala,AWS,Azure,GCP,Berlin"
									value={field.state.value}
									onChange={(event) => field.handleChange(event.target.value)}
								/>
							)}
						/>
					</div>
				</div>

				<Separator className="my-6" />
				{/** original */}

				<div className="space-y-6">
					<div className="flex items-center justify-between">
						<h2 className="text-lg font-semibold text-[#2d2d2d]">
							Job Description
						</h2>
						<form.AppField name="jobDescriptions" mode="array">
							{(field) => (
								<Button
									type="button"
									onClick={() => {
										field.pushValue({ name: "", value: "" });
										setActiveSection(field.state.value.length + 1);
									}}
									variant="outline"
									size="sm"
									className="text-[#2557a7] border-[#e4e2e0] hover:bg-[#f3f2f1] hover:text-[#2557a7]"
								>
									<Plus className="h-4 w-4 mr-1" /> Add Section
								</Button>
							)}
						</form.AppField>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
						{/* Section Navigation */}
						<div className="md:col-span-1">
							<div className="space-y-1 sticky top-4">
								<form.AppField
									name="jobDescriptions"
									mode="array"
									children={(field) => {
										return field.state.value.map((jd, index) => (
											<div
												key={`jd-${index}-section`}
												className="flex items-center gap-1"
											>
												<Button
													type="button"
													variant="ghost"
													className={cn(
														"justify-start w-full text-left h-auto py-2 px-3 rounded-md",
														activeSection === index
															? "bg-[#f3f2f1] text-[#2557a7] font-medium"
															: "text-[#595959] hover:bg-[#f3f2f1]",
													)}
													onClick={() => setActiveSection(index)}
												>
													<span className="truncate">
														{jd.name || `Section ${index + 1}`}
													</span>
												</Button>
												<div className="flex flex-col gap-1">
													<Button
														type="button"
														variant="ghost"
														size="icon"
														className="h-6 w-6 text-[#595959]"
														onClick={() => {
															const newIndex = index - 1;
															if (
																newIndex >= 0 &&
																newIndex < field.state.value.length
															) {
																field.moveValue(index, newIndex);
																setActiveSection(newIndex);
															}
														}}
														disabled={index === 0}
													>
														<MoveUp className="h-3 w-3" />
														<span className="sr-only">Move up</span>
													</Button>
													<Button
														type="button"
														variant="ghost"
														size="icon"
														className="h-6 w-6 text-[#595959]"
														onClick={() => {
															const newIndex = index + 1;
															if (
																newIndex >= 0 &&
																newIndex < field.state.value.length
															) {
																field.moveValue(index, newIndex);
																setActiveSection(newIndex);
															}
														}}
														disabled={index === field.state.value.length - 1}
													>
														<MoveDown className="h-3 w-3" />
														<span className="sr-only">Move down</span>
													</Button>
												</div>
											</div>
										));
									}}
								/>
							</div>
						</div>

						{/* Active Section Editor */}
						<div className="md:col-span-3">
							<form.AppField
								name="jobDescriptions"
								children={(field) => {
									return field.state.value.map((jd, index) => {
										return (
											<div
												key={`jd-${index}-editor`}
												className={cn(
													"space-y-4",
													activeSection === index ? "block" : "hidden",
												)}
											>
												<div className="flex items-center justify-between">
													<form.AppField
														name={`jobDescriptions[${index}].name`}
														children={(field) => (
															<field.FormInput
																label="Section Title *"
																placeholder="e.g. About the Role, Responsibilities"
																value={field.state.value}
																onChange={(event) =>
																	field.handleChange(event.target.value)
																}
															/>
														)}
													/>

													<Button
														type="button"
														variant="ghost"
														size="icon"
														className="h-9 w-9 mt-8 text-[#d93025] hover:bg-[#f3f2f1]"
														onClick={() => {
															if (field.state.value.length > 1) {
																field.removeValue(index);
																// Adjust active section if needed
																if (
																	activeSection >= index &&
																	activeSection > 0
																) {
																	setActiveSection(activeSection - 1);
																}
															} else {
																toast.warning("Cannot remove section", {
																	description:
																		"You must have at least one job description section.",
																});
															}
														}}
													>
														<Trash2 className="h-4 w-4" />
														<span className="sr-only">Remove section</span>
													</Button>
												</div>

												<form.AppField
													name={`jobDescriptions[${index}].value`}
													children={(jdField) => (
														<jdField.FormItem>
															<jdField.FormLabel className="text-[#2d2d2d]">
																Section Content *
															</jdField.FormLabel>
															<jdField.FormControl>
																<RichTextEditor
																	value={jdField.state.value}
																	onChange={(value) =>
																		jdField.handleChange(value)
																	}
																	placeholder={`Enter content for ${jd.name || `Section ${index + 1}`}`}
																/>
															</jdField.FormControl>
															<jdField.FormMessage />
														</jdField.FormItem>
													)}
												/>
											</div>
										);
									});
								}}
							/>
						</div>
					</div>
				</div>
				{/** original end */}
				<div className="flex justify-end gap-4 pt-4">
					<Button
						variant="outline"
						type="button"
						onClick={() => navigate("/")}
						className="border-[#e4e2e0] text-[#595959] hover:bg-[#f3f2f1]"
					>
						Cancel
					</Button>
					<form.AppForm>
						<form.FormSubmit>Create Job Posting</form.FormSubmit>
					</form.AppForm>
				</div>
			</div>
		</form>
	);
}
