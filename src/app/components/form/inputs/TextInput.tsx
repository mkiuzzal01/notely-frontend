"use client";
import React, { useState } from "react";
import { Controller, useFormContext, RegisterOptions } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface TextInputProps {
  label?: string;
  name: string;
  placeholder?: string;
  type?: string;
  icon?: React.ReactNode;
  className?: string;
  inputClassName?: string;
  required?: boolean;
  disabled?: boolean;
  min?: number;
  rules?: Omit<
    RegisterOptions,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
}

// Map common input types to regex validation rules and messages
const getTypeValidationRule = (type: string, fieldName: string) => {
  switch (type) {
    case "email":
      return {
        pattern: {
          value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          message: `Please enter a valid email address`,
        },
      };
    case "tel":
      return {
        pattern: {
          value: /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/,
          message: `Please enter a valid phone number`,
        },
      };
    case "url":
      return {
        pattern: {
          value: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/,
          message: `Please enter a valid URL`,
        },
      };
    case "number":
      return {
        pattern: {
          value: /^\d*\.?\d*$/,
          message: `${fieldName} must be a valid positive number`,
        },
      };
    default:
      return {};
  }
};

export default function TextInput({
  label,
  name,
  placeholder,
  type = "text",
  icon,
  required,
  className,
  rules,
  disabled = false,
  min,
  inputClassName,
}: TextInputProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  const errorMessage = (errors?.[name]?.message as string | undefined) || "";

  const formatErrorLabel = () => {
    if (label) return label;
    const readable = name.replaceAll("_", " ");
    return readable.charAt(0).toUpperCase() + readable.slice(1);
  };

  const fieldLabel = formatErrorLabel();
  const typeRules = getTypeValidationRule(type, fieldLabel);

  return (
    <div className={cn("space-y-1.5 w-full mb-6", className)}>
      {label && (
        <Label htmlFor={name} className="text-sm font-medium text-gray-600">
          {label}
        </Label>
      )}

      <Controller
        name={name}
        control={control}
        rules={{
          required: required ? `${fieldLabel} is required` : false,
          ...(type === "number" && {
            min: {
              value: min ?? 0,
              message: `${fieldLabel} cannot be negative`,
            },
          }),
          ...typeRules,
          ...rules, // Custom rules passed via props override defaults
        }}
        render={({ field: { onChange, value, ...fieldProps } }) => (
          <>
            <div className="relative group">
              {icon && (
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors">
                  <span className="w-4 h-4 flex items-center justify-center">
                    {icon}
                  </span>
                </div>
              )}

              <Input
                id={name}
                {...fieldProps}
                disabled={disabled}
                value={value ?? ""}
                type={isPassword ? (showPassword ? "text" : "password") : type}
                min={type === "number" ? (min ?? 0) : undefined}
                onKeyDown={(e) => {
                  if (
                    type === "number" &&
                    ["-", "+", "e", "E"].includes(e.key)
                  ) {
                    e.preventDefault();
                  }
                }}
                onChange={(e) => {
                  const rawVal = e.target.value;

                  if (type === "number" && Number(rawVal) < 0) return;

                  onChange(rawVal);
                }}
                placeholder={placeholder}
                className={cn(
                  "h-11 w-full transition",
                  "focus-visible:ring-2 focus-visible:ring-primary/30",
                  "focus-visible:border-primary",
                  inputClassName,
                  errorMessage &&
                    "border-red-400 focus-visible:ring-red-100 focus-visible:border-red-500",
                  icon && "pl-9",
                  isPassword && "pr-10",
                )}
              />

              {isPassword && (
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                >
                  <span className="w-4 h-4 flex items-center justify-center">
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </span>
                </button>
              )}
            </div>

            {errorMessage && (
              <p className="text-xs text-red-500 mt-1 font-medium">
                {errorMessage}
              </p>
            )}
          </>
        )}
      />
    </div>
  );
}