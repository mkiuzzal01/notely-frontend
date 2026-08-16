/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Controller, useFormContext } from "react-hook-form";

type Option = {
  label: string;
  value: string;
};

type Props = {
  name: string;
  label?: string;
  placeholder?: string;
  options: Option[];
  required?: boolean;
  className?: string;
  disabled?: boolean;
  rules?: any;
  onChange?: (value: string) => void;
};

export default function SelectInput({
  name,
  label,
  placeholder = "Select an option...",
  options,
  required,
  className,
  disabled = false,
  rules = {},
  onChange,
}: Props) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  // Handle nested object structure lookup safely (e.g., deep errors paths)
  const errorMessage = errors?.[name]?.message as string | undefined;

  return (
    <div className={cn(`w-full space-y-1.5 ${className || ""}`)}>
      {/* Label */}
      {label && (
        <Label
          htmlFor={name}
          className="text-sm font-medium text-gray-600 block"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </Label>
      )}

      <Controller
        name={name}
        control={control}
        rules={{
          required: {
            value: !!required,
            message: `${label || "This field"} is required`,
          },
          ...rules,
        }}
        render={({ field }) => {
          const selectedOption = options.find(
            (opt) => opt.value === field.value,
          );

          return (
            <div className="relative">
              <Select
                disabled={disabled}
                value={field.value || ""}
                onValueChange={(value) => {
                  field.onChange(value); // Updates react-hook-form state
                  if (onChange) onChange(value); // Fires custom reset side-effects
                }}
              >
                <SelectTrigger
                  id={name}
                  style={{ height: "42px" }}
                  className={cn(
                    "w-full px-4 bg-white border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#31BFC8]/20 focus:border-[#31BFC8] transition-all",
                    errorMessage
                      ? "border-red-500 focus:ring-red-200 focus:border-red-500"
                      : "border-slate-200",
                  )}
                >
                  <SelectValue placeholder={placeholder}>
                    {selectedOption ? selectedOption.label : undefined}
                  </SelectValue>
                </SelectTrigger>

                <SelectContent className="bg-white text-black border shadow-md rounded-xl">
                  {options.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Error message text layout */}
              {errorMessage && (
                <p className="text-xs text-red-500 font-medium mt-1">
                  {errorMessage}
                </p>
              )}
            </div>
          );
        }}
      />
    </div>
  );
}