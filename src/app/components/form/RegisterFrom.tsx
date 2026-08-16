"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { User, Mail, Lock, Phone, MapPin, Loader2 } from "lucide-react";
import AppForm from "@/app/components/form/AppForm";
import TextInput from "@/app/components/form/inputs/TextInput";
import { useAppDispatch } from "@/app/redux/hooks/global.hooks";
import { useRegisterMutation } from "@/app/redux/features/auth/auth.api";
import { setUser } from "@/app/redux/features/auth/auth.slice";
import { FieldValues } from "react-hook-form";
import SelectInput from "./inputs/SelectInput";

export default function Register() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [register, { isLoading }] = useRegisterMutation();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onSubmit = async (values: FieldValues, reset: () => void) => {
    setErrorMessage(null);

    // Transforming fields to match IUser interface
    const payload = {
      name: values.name,
      email: values.email,
      password: values.password,
      gender: values.gender,
      role: "user", // default required TUserRole
      status: "in-progress", // default required TUserStatus
      isDeleted: false,
      ...(values.phone && { phone: values.phone }),
      ...((values.presentAddress || values.permanentAddress) && {
        address: {
          presentAddress: values.presentAddress || "",
          permanentAddress: values.permanentAddress || "",
        },
      }),
    };

    try {
      const res = await register(payload).unwrap();

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
        router.push("/dashboard");
        router.refresh();
      }
    } catch (error: unknown) {
      const apiError = error as { data?: { message?: string } };
      setErrorMessage(apiError?.data?.message || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-8 bg-gray-50/50">
      <div className="w-full max-w-md overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
        <div className="flex flex-col gap-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">Create an Account</h2>
            <p className="mt-1 text-sm text-muted-foreground">Fill in your details to get started</p>
          </div>

          {errorMessage && (
            <div className="rounded-lg bg-red-50 p-3 text-xs text-red-600 border border-red-200">
              {errorMessage}
            </div>
          )}

          <AppForm
            onSubmit={onSubmit}
            defaultValues={{
              name: "",
              email: "",
              password: "",
              gender: "male",
              phone: "",
              presentAddress: "",
              permanentAddress: "",
            }}
          >
            <div className="flex flex-col gap-3">
              <TextInput
                icon={<User size={18} />}
                label="Full Name"
                name="name"
                className="h-12"
                required
                placeholder="John Doe"
              />

              <TextInput
                type="email"
                icon={<Mail size={18} />}
                label="Email Address"
                name="email"
                className="h-12"
                required
                placeholder="you@example.com"
              />



              {/* Gender Select Input */}
              <SelectInput name="gender" label="Gender" options={[
                { value: "male", label: "Male" },
                { value: "female", label: "Female" },
                { value: "other", label: "Other" }
              ]} />


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
                      <Loader2 className="h-4 w-4 animate-spin" /> Creating account...
                    </span>
                  ) : (
                    "Create Account"
                  )}
                </button>
              </div>
            </div>
          </AppForm>

          <p className="text-center text-xs text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="font-semibold text-primary hover:underline">
              Log in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}