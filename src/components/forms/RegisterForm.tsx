"use client";

import React, { FC } from "react";
import { Input } from "@/components/ui/Input";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { registerUser } from "@/lib/apiCalls";
import ErrorSpan from "../ErrorSpan";
import Link from "next/link";
import { AxiosError } from "axios";
import { useToast } from "@/hooks/toastStore";
import { useRouter } from "next/navigation";
const LoginValidator = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .max(100, { message: "Email must be less than 100 characters long" }),
  passwordForm: z
    .object({
      password: z
        .string()
        .min(4, { message: "Password must be at least 4 characters long" })
        .max(30, { message: "Password must be less than 30 characers long" }),
      confirm: z
        .string()
        .max(30, { message: "Password must be less than 30 characers long" }),
    })
    .refine(
      (data) => {
        return data.password === data.confirm;
      },
      { message: "Passwords do not match" }
    ),
});

const RegisterForm: FC = ({}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof LoginValidator>>({
    resolver: zodResolver(LoginValidator),
  });

  const router = useRouter()

  const { toast } = useToast();

  const [loading, setLoading] = useState(false);

  const handler: SubmitHandler<z.infer<typeof LoginValidator>> = async (
    data
  ) => {
    setLoading(true);
    try {
      const res = await registerUser(data.email, data.passwordForm.password);
      toast({title: "Account created"})
      router.push("/login")
    } catch (e) {
      if (e instanceof AxiosError) {
        if (e.response?.statusText) {
          toast({ title: e.response.statusText, type: "error" });
        }
      }
    }
    setLoading(false);
  };

  return (
    <form
      className="flex flex-col  gap-2 mt-4"
      onSubmit={handleSubmit(handler)}
    >
      <fieldset disabled={loading} className="group space-y-2">
        <label className="flex flex-col dark:text-white ">
          <span className=" text-sm">Email</span>
          <Input
            type="email"
            placeholder="example@example.com"
            {...register("email")}
          />
          {errors.email?.message && (
            <ErrorSpan>{errors.email.message}</ErrorSpan>
          )}
        </label>
        <label className="flex flex-col dark:text-white">
          <span className="text-sm">Password</span>
          <Input type="password" {...register("passwordForm.password")} />
          {errors.passwordForm?.password?.message && (
            <ErrorSpan>{errors.passwordForm.password.message}</ErrorSpan>
          )}
        </label>
        <label className="flex flex-col dark:text-white">
          <span className="text-sm">Repeat password</span>
          <Input type="password" {...register("passwordForm.confirm")} />
          {errors.passwordForm?.confirm?.message && (
            <ErrorSpan>{errors.passwordForm.confirm.message}</ErrorSpan>
          )}
        </label>
        <div>
          {errors.passwordForm?.message && (
            <ErrorSpan>{errors.passwordForm.message}</ErrorSpan>
          )}
        </div>

        <Button
          type="submit"
          className="inline-flex items-center relative"
          disabled={loading}
        >
          <Loader2
            strokeWidth={3}
            className="animate-spin absolute group-enabled:opacity-0"
          />
          <span className="group-disabled:opacity-0">Register</span>
        </Button>
      </fieldset>
      <span>
        Have an account?{" "}
        <Link href="login" className="text-sky-500 hover:underline">
          Sign in!
        </Link>
      </span>
    </form>
  );
};

export default RegisterForm;
