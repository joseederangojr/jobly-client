"use client";

import type React from "react";
import { useSearchParams } from "react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin } from "lucide-react";

export function SearchBar() {
	const [searchParams, setSearchParams] = useSearchParams();

	const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		e.stopPropagation();
		const fd = new FormData(e.currentTarget);
		setSearchParams({
			search: fd.get("search")?.toString() || "",
			location: fd.get("location")?.toString() || "",
		});
	};

	return (
		<form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2">
			<div className="relative flex-1">
				<Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#595959]" />
				<Input
					type="text"
					name="search"
					placeholder="Job title, keywords, or company"
					defaultValue={searchParams.get("search") || ""}
					className="pl-10 border-[#e4e2e0] focus-visible:ring-[#2557a7] h-12"
				/>
			</div>

			<div className="relative flex-1">
				<MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#595959]" />
				<Input
					type="text"
					name="location"
					placeholder="City, state, or remote"
					defaultValue={searchParams.get("location") || ""}
					className="pl-10 border-[#e4e2e0] focus-visible:ring-[#2557a7] h-12"
				/>
			</div>

			<Button
				type="submit"
				className="bg-[#2557a7] hover:bg-[#1f4b8f] text-white h-12 px-8"
			>
				Search
			</Button>
		</form>
	);
}
