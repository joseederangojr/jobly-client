import { BriefcaseIcon } from "lucide-react";
import type React from "react";
import { Link } from "react-router";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

const Root = (props: React.PropsWithChildren) => {
	return (
		<div className="min-h-screen bg-[#f3f2f1] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-sm border border-gray-200">
				{props.children}
			</div>
		</div>
	);
};

const HeaderRoot = (props: React.PropsWithChildren) => {
	return <div className="text-center">{props.children}</div>;
};

const HeaderLogo = () => {
	return (
		<div className="flex justify-center">
			<div className="bg-[#2557a7] p-3 rounded-full">
				<BriefcaseIcon className="h-8 w-8 text-white" />
			</div>
		</div>
	);
};

const HeaderTitle = (props: React.PropsWithChildren) => {
	return (
		<h2 className="mt-4 text-3xl font-bold text-[#2d2d2d]">{props.children}</h2>
	);
};

type HeaderLinkProps = {
	to: string;
	text: string;
};
const HeaderLink = (props: React.PropsWithChildren<HeaderLinkProps>) => {
	return (
		<p className="mt-2 text-sm text-[#595959]">
			{props.text}{" "}
			<Link
				to={props.to}
				className="font-medium text-[#2557a7] hover:text-[#1f4b8f]"
			>
				{props.children}
			</Link>
		</p>
	);
};

const Footer = () => {
	return (
		<div className="relative mt-6">
			<div className="absolute inset-0 flex items-center">
				<Separator className="w-full" />
			</div>
			<div className="relative flex justify-center text-sm">
				<span className="px-2 bg-white text-[#595959]">Or continue with</span>
			</div>
		</div>
	);
};

const FooterActions = (props: React.PropsWithChildren) => {
	return <div className="mt-6 grid grid-cols-2 gap-3">{props.children}</div>;
};

interface AuthWithButtonProps extends React.ComponentProps<"button"> {}
const AuthWithButton = (props: AuthWithButtonProps) => {
	return (
		<Button
			variant="outline"
			className="border-[#e4e2e0] text-[#595959]"
			{...props}
		/>
	);
};

function Loading() {
	return (
		<div className="min-h-screen bg-[#f3f2f1] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-sm border border-gray-200">
				<div className="text-center">
					<div className="flex justify-center">
						<Skeleton className="h-14 w-14 rounded-full" />
					</div>
					<Skeleton className="h-9 w-48 mx-auto mt-4" />
					<Skeleton className="h-5 w-64 mx-auto mt-2" />
				</div>

				<div className="space-y-6">
					<div className="space-y-2">
						<Skeleton className="h-5 w-32" />
						<Skeleton className="h-10 w-full" />
					</div>

					<div className="space-y-2">
						<div className="flex items-center justify-between">
							<Skeleton className="h-5 w-24" />
							<Skeleton className="h-5 w-32" />
						</div>
						<Skeleton className="h-10 w-full" />
					</div>

					<Skeleton className="h-10 w-full" />
				</div>

				<div className="relative mt-6">
					<div className="absolute inset-0 flex items-center">
						<Skeleton className="w-full h-px" />
					</div>
					<div className="relative flex justify-center text-sm">
						<Skeleton className="h-5 w-32 bg-white" />
					</div>
				</div>

				<div className="mt-6 grid grid-cols-2 gap-3">
					<Skeleton className="h-10 w-full" />
					<Skeleton className="h-10 w-full" />
				</div>
			</div>
		</div>
	);
}

export {
	Root,
	HeaderRoot,
	HeaderLogo,
	HeaderTitle,
	HeaderLink,
	Footer,
	FooterActions,
	AuthWithButton,
	Loading,
};
