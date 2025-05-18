"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Filter, X } from "lucide-react";
import { DepartmentMultiSelect } from "./departments-multi-select";
import { SeniorityMultiSelect } from "./seniority-multi-select";

export function JobFilters() {
	const [searchParams, setSearchParams] = useSearchParams();
	const hasFilters =
		searchParams.has("department") && searchParams.has("seniority");
	const handleMultiSelectChange = (field: string) => (items: string[]) => {
		setSearchParams((prev) => {
			prev.delete(field);
			items.forEach((item, i) => {
				prev.append(field, item);
			});

			return prev;
		});
	};

	return (
		<div className="space-y-3">
			<div className="flex flex-wrap gap-3 items-center">
				<div className="flex items-center">
					<Filter className="h-4 w-4 mr-2 text-[#595959]" />
					<span className="text-[#2d2d2d] font-medium">Filters:</span>
				</div>

				<div className="flex gap-2 items-center">
					<div className="max-w-[300px]">
						<DepartmentMultiSelect
							value={searchParams.getAll("department") ?? []}
							onValueChange={handleMultiSelectChange("department")}
						/>
					</div>

					<div className="max-w-[300px]">
						<SeniorityMultiSelect
							value={searchParams.getAll("seniority") || []}
							onValueChange={handleMultiSelectChange("seniority")}
						/>
					</div>
				</div>
				{hasFilters && (
					<Button
						variant="link"
						onClick={() => setSearchParams({})}
						className="text-[#2557a7] hover:text-[#1f4b8f] p-0 h-auto font-medium flex-end"
					>
						Clear All
					</Button>
				)}
			</div>
		</div>
	);
}
