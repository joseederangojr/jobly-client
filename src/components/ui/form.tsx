import { Slot } from "@radix-ui/react-slot";
import * as React from "react";

import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
	createFormHook,
	createFormHookContexts,
	useStore,
} from "@tanstack/react-form";
import { Loader2Icon } from "lucide-react";
import { Button } from "./button";
import { Input } from "./input";

const {
	fieldContext,
	formContext,
	useFieldContext: _useFieldContext,
	useFormContext,
} = createFormHookContexts();

const { useAppForm, withForm } = createFormHook({
	fieldContext,
	formContext,
	fieldComponents: {
		FormLabel,
		FormControl,
		FormDescription,
		FormMessage,
		FormItem,
		FormInput,
	},
	formComponents: {
		FormSubmit,
	},
});

type FormItemContextValue = {
	id: string;
};

const FormItemContext = React.createContext<FormItemContextValue>(
	{} as FormItemContextValue,
);

function FormItem(props: React.ComponentProps<"div">) {
	const { className, ...rest } = props;
	const id = React.useId();

	return (
		<FormItemContext.Provider value={{ id }}>
			<div
				data-slot="form-item"
				className={cn("grid gap-2", className)}
				{...rest}
			/>
		</FormItemContext.Provider>
	);
}

const useFieldContext = () => {
	const { id } = React.useContext(FormItemContext);
	const { name, store, ...fieldContext } = _useFieldContext();

	const errors = useStore(store, (state) => state.meta.errors);
	if (!fieldContext) {
		throw new Error("useFieldContext should be used within <FormItem>");
	}

	return {
		id,
		name,
		formItemId: `${id}-form-item`,
		formDescriptionId: `${id}-form-item-description`,
		formMessageId: `${id}-form-item-message`,
		errors,
		store,
		...fieldContext,
	};
};

function FormLabel(props: React.ComponentProps<typeof Label>) {
	const { className, ...rest } = props;
	const { formItemId, errors } = useFieldContext();

	return (
		<Label
			data-slot="form-label"
			data-error={!!errors.length}
			className={cn("data-[error=true]:text-destructive", className)}
			htmlFor={formItemId}
			{...rest}
		/>
	);
}

function FormControl(props: React.ComponentProps<typeof Slot>) {
	const { errors, formItemId, formDescriptionId, formMessageId } =
		useFieldContext();

	return (
		<Slot
			data-slot="form-control"
			id={formItemId}
			aria-describedby={
				!errors.length
					? `${formDescriptionId}`
					: `${formDescriptionId} ${formMessageId}`
			}
			aria-invalid={!!errors.length}
			{...props}
		/>
	);
}

function FormDescription({ className, ...props }: React.ComponentProps<"p">) {
	const { formDescriptionId } = useFieldContext();

	return (
		<p
			data-slot="form-description"
			id={formDescriptionId}
			className={cn("text-muted-foreground text-sm", className)}
			{...props}
		/>
	);
}

function FormMessage(props: React.ComponentProps<"p">) {
	const { className, ...rest } = props;
	const { errors, formMessageId } = useFieldContext();
	const body = errors.length
		? String(errors.at(0)?.message ?? "")
		: props.children;
	if (!body) return null;

	return (
		<p
			data-slot="form-message"
			id={formMessageId}
			className={cn("text-destructive text-sm", className)}
			{...rest}
		>
			{body}
		</p>
	);
}

interface FormSubmitProps extends React.ComponentProps<"button"> {
	disabled?: never;
}
function FormSubmit(props: FormSubmitProps) {
	const { disabled: _, children, className, ...rest } = props;
	const form = useFormContext();
	return (
		<form.Subscribe
			selector={(state) => [state.canSubmit, state.isSubmitting]}
			children={([canSubmit, isSubmitting]) => (
				<Button
					type="submit"
					disabled={isSubmitting || !canSubmit}
					className={cn(
						"w-full bg-[#2557a7] hover:bg-[#1f4b8f] text-white",
						className,
					)}
					{...rest}
				>
					{isSubmitting ? (
						<Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
					) : undefined}
					{children}
				</Button>
			)}
		></form.Subscribe>
	);
}

interface FormInputProps extends React.ComponentProps<"input"> {
	label: string;
}
function FormInput(props: FormInputProps) {
	const { label, ...rest } = props;
	return (
		<FormItem>
			<FormLabel className="text-[#2d2d2d]">{label}</FormLabel>
			<FormControl>
				<Input {...rest} />
			</FormControl>
			<FormMessage />
		</FormItem>
	);
}

export { useAppForm, useFormContext, useFieldContext, withForm };
