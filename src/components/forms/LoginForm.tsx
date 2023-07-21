"use client";
import { FC } from "react";
import { Input } from "@/components/ui/Input";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

interface Inputs {
  email: string;
  password: string;
}

const LoginForm: FC = ({}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const [loading, setLoading] = useState(false);

  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  const handler: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);
    await signIn("credentials", {
      email: data.email,
      password: data.password,
      callbackUrl: "/photos",
      redirect: true,
    });
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
            {...register("email", { required: "Email is required" })}
          />
          {errors?.email && (
            <span className="my-1 text-red-500 text-sm">
              {errors.email.message}
            </span>
          )}
        </label>
        <label className="flex flex-col dark:text-white">
          <span className="text-sm">Password</span>
          <Input
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                message: "Minimum 5 characters",
                value: 5,
              },
            })}
          />
          {errors?.password && (
            <span className="my-1 text-red-500 text-sm">
              {errors.password.message}
            </span>
          )}
        </label>
        {error && (
          <div className="border border-red-800 dark:border-red-300 bg-red-300 dark:bg-red-800 rounded-xl p-3 font-semibold mt-2">
            Wrong Credentials.
          </div>
        )}
        <Button
          type="submit"
          className="inline-flex items-center relative"
          disabled={loading}
        >
          <Loader2
            strokeWidth={3}
            className="animate-spin absolute group-enabled:opacity-0"
          />
          <span className="group-disabled:opacity-0">Log in</span>
        </Button>
      </fieldset>
      <span>Don&apos;t have an account? <Link href='register' className="text-sky-500 hover:underline">Create account!</Link></span>
    </form>
  );
};

export default LoginForm;
