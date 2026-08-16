"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Lock, Mail, Loader2 } from "lucide-react";
import AppForm from "./AppForm";
import TextInput from "./inputs/TextInput";
import { useAppDispatch } from "@/app/redux/hooks/global.hooks";
import { useLoginMutation } from "@/app/redux/features/auth/auth.api";
import { setUser } from "@/app/redux/features/auth/auth.slice";
import { FieldValues } from "react-hook-form";

export default function LoginForm() {
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect");
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [login, { isLoading }] = useLoginMutation();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const redirectPath = redirectUrl || "/";

  const onSubmit = async (values: FieldValues, reset: () => void) => {
    setErrorMessage(null);

    try {
      const res = await login(values).unwrap();

      if (res?.token) {
        dispatch(
          setUser({
            user: {
              id: res.data?._id,
              email: res.data?.email,
              role: res.data?.role,
              name: res.data?.name,
        
            },
            token: res.token,
          })
        );

        reset();
        router.push(redirectPath);
        router.refresh();
      }
    } catch (error: unknown) {
      const apiError = error as { data?: { message?: string } };
      setErrorMessage(apiError?.data?.message || "Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 bg-gray-50/50">
      <div className="w-full max-w-md overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
        <div className="flex flex-col gap-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">Welcome Back</h2>
            <p className="mt-1 text-sm text-muted-foreground">Please Login to your account</p>
          </div>

          {errorMessage && (
            <div className="rounded-lg bg-red-50 p-3 text-xs text-red-600 border border-red-200">
              {errorMessage}
            </div>
          )}

          <AppForm
            onSubmit={onSubmit}
            defaultValues={{
              email: "",
              password: "",
            }}
          >
            <div className="flex flex-col gap-3">
              <TextInput
                type="email"
                icon={<Mail size={18} />}
                label="Email Address"
                name="email"
                className="h-12"
                required
                placeholder="you@example.com"
              />

              <TextInput
                icon={<Lock size={18} />}
                label="Password"
                name="password"
                type="password"
                className="h-12"
                required
                rules={{
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters long",
                  },
                }}
                placeholder="••••••••"
              />

              <div className="pt-2">
                <button
                  type="submit"
                  className="flex h-12 w-full items-center justify-center rounded-full bg-primary font-medium text-white transition-colors hover:bg-[#0f7275] disabled:cursor-not-allowed disabled:opacity-70"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" /> Logging in...
                    </span>
                  ) : (
                    "Log In"
                  )}
                </button>
              </div>
            </div>
          </AppForm>

          <p className="text-center text-xs text-gray-600">
            Don&apos;t have an account?{" "}
            <a href="/register" className="font-semibold text-primary hover:underline">
              Create one
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}