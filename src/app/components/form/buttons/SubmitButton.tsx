"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { useFormContext } from "react-hook-form";

interface SubmitButtonProps {
  title?: string;
  loadingTitle?: string;
  className?: string;
  disabled?: boolean;
  children?: React.ReactNode;
}

export default function SubmitButton({
  title,
  loadingTitle = "Loading...",
  className,
  disabled,
  children,
}: SubmitButtonProps) {
  const { formState } = useFormContext();
  const isLoading = formState.isSubmitting;

  return (
    <Button
      type="submit"
      className={className}
      disabled={isLoading || disabled}
    >
      {isLoading ? loadingTitle : children || title}
    </Button>
  );
}