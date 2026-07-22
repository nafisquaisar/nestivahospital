/**
 * DepartmentSelect
 * ─────────────────────────────────────────────────────────────────────────────
 * Reusable department dropdown built on top of Shadcn Select.
 * Renders all 10 hospital departments with department-themed icons.
 */
"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DEPARTMENTS, type Department } from "@/types/appointment";

interface DepartmentSelectProps {
  value: string;
  onValueChange: (value: Department) => void;
  hasError?: boolean;
  disabled?: boolean;
}

export function DepartmentSelect({
  value,
  onValueChange,
  hasError = false,
  disabled = false,
}: DepartmentSelectProps) {
  return (
    <Select
      value={value}
      onValueChange={onValueChange as (val: string) => void}
      disabled={disabled}
    >
      <SelectTrigger
        id="department"
        aria-label="Select department"
        className={
          hasError
            ? "border-red-400 focus:ring-red-400 bg-red-50/30"
            : "h-11"
        }
      >
        <SelectValue placeholder="Select a department" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground px-2 py-1.5">
            Departments
          </SelectLabel>
          {DEPARTMENTS.map((dept) => (
            <SelectItem key={dept} value={dept}>
              {dept}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
