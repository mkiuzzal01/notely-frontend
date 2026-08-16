"use client";

import React, { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

interface TagInputProps {
  label?: string;
  name: string;
  placeholder?: string;
  icon?: React.ReactNode;
  className?: string;
  required?: boolean;
}

export default function TagInput({
  label,
  name,
  placeholder,
  icon,
  className,
  required = false,
}: TagInputProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const [inputValue, setInputValue] = useState("");
  const errorMessage = (errors?.[name]?.message as string | undefined) || "";

  return (
    <div className={cn("space-y-1.5 w-full mb-6", className)}>
      {/* LABEL WITH OPTIONAL RED MANDATORY INDICATOR */}
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
          validate: (value) => {
            if (required) {
              // Ensure array state checking confirms there is at least one tag
              if (!value || !Array.isArray(value) || value.length === 0) {
                return `${label || "This field"} is required`;
              }
            }
            return true;
          },
        }}
        render={({ field }) => {
          // Safeguard to ensure value is always an array
          const tags: string[] = Array.isArray(field.value) ? field.value : [];

          const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Enter" || e.key === ",") {
              e.preventDefault();
              const trimmedValue = inputValue.trim();

              // Prevent duplicate tags and empty spaces
              if (trimmedValue && !tags.includes(trimmedValue)) {
                const updatedTags = [...tags, trimmedValue];
                field.onChange(updatedTags);
                setInputValue("");
              }
            }

            // Remove the last tag if backspace is pressed on an empty input
            if (e.key === "Backspace" && !inputValue && tags.length > 0) {
              e.preventDefault();
              const updatedTags = tags.slice(0, -1);
              field.onChange(updatedTags);
            }
          };

          const removeTag = (tagToRemove: string) => {
            const updatedTags = tags.filter((tag) => tag !== tagToRemove);
            field.onChange(updatedTags);
          };

          return (
            <>
              {/* INPUT CONTAINER (Imitates standard shadcn Input box) */}
              <div
                className={cn(
                  "flex flex-wrap items-center gap-2 min-h-11 w-full rounded-lg border px-3 py-2 text-sm ring-offset-background transition-all relative group",
                  "focus-within:outline-none focus-within:ring-2 focus-within:ring-primary/30 focus-within:border-primary",
                  errorMessage
                    ? "border-red-500 focus-within:ring-red-200 focus-within:border-red-500"
                    : "border-gray-200",
                  icon && "pl-9",
                )}
              >
                {/* LEFT ICON */}
                {icon && (
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors">
                    <span className="w-4 h-4 flex items-center justify-center">
                      {icon}
                    </span>
                  </div>
                )}

                {/* RENDERED TAGS */}
                {tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="bg-gray-200 text-gray-800 flex items-center gap-1 py-0.5 pl-2 pr-1 text-sm font-normal"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-1 hover:bg-muted"
                    >
                      <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                    </button>
                  </Badge>
                ))}

                {/* ACTUAL HIDDEN TEXT INPUT */}
                <input
                  id={name}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={tags.length === 0 ? placeholder : ""}
                  className="flex-1 bg-transparent outline-none placeholder:text-muted-foreground min-w-[120px] text-sm h-full"
                />
              </div>

              {/* DYNAMIC FORM FEEDBACK CONTAINER */}
              {errorMessage && (
                <p className="text-xs text-red-500 font-medium mt-1">
                  {errorMessage}
                </p>
              )}
            </>
          );
        }}
      />
    </div>
  );
}