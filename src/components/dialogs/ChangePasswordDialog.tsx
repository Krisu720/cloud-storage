"use client";

import { FC, useState } from "react";
import { Button } from "../ui/button";

import { useForm, SubmitHandler, set } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorSpan from "../ErrorSpan";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { Input } from "~/components/ui/input";
import {User} from '~/types'
import { DialogHeader } from "../ui/dialog";
import { api } from "~/trpc/react";

interface ChangePasswordDialogProps {
  user: User;
}

const LoginValidator = z.object({
  password: z
    .string()
    .min(4, { message: "Password must be at least 4 characters long" })
    .max(30, { message: "Password must be less than 30 characers long" }),
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

const ChangePasswordDialog: FC<ChangePasswordDialogProps> = ({ user }) => {
  const auth = api.auth.changePassword.useMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof LoginValidator>>({
    resolver: zodResolver(LoginValidator),
  });

  const [loading, setLoading] = useState<boolean>(false);

  const handler: SubmitHandler<z.infer<typeof LoginValidator>> = async (
    data
  ) => {
    setLoading(true);
    try {
      await auth.mutateAsync(
        {
          newPassword: data.passwordForm.confirm,
          oldPassword: data.password,
        },
        {
          onError: (err) => toast.error(err.message),
          onSuccess: () => toast.success("Password has been changed."),
        }
      );
    } catch (e) {}
    setLoading(false);
  };

  return (
    <>
      <DialogHeader>Change password</DialogHeader>
      <form onSubmit={handleSubmit(handler)}>
        <fieldset className="group space-y-2 mt-4" disabled={loading}>
          <label className="flex flex-col dark:text-white ">
            <span className=" text-sm">Previous password</span>
            <Input type="password" {...register("password")} />
            {errors.password?.message && (
              <ErrorSpan>{errors.password.message}</ErrorSpan>
            )}
          </label>
          <label className="flex flex-col dark:text-white">
            <span className="text-sm">New password</span>
            <Input type="password" {...register("passwordForm.password")} />
            {errors.passwordForm?.password?.message && (
              <ErrorSpan>{errors.passwordForm.password.message}</ErrorSpan>
            )}
          </label>
          <label className="flex flex-col dark:text-white">
            <span className="text-sm">Repeat new password</span>
            <Input type="password" {...register("passwordForm.confirm")} />
            {errors?.passwordForm?.confirm?.message && (
              <ErrorSpan>{errors.passwordForm.confirm.message}</ErrorSpan>
            )}
          </label>
          <div className="mt-12">
            {errors.passwordForm?.message && (
              <ErrorSpan>{errors.passwordForm.message}</ErrorSpan>
            )}
          </div>
          <Button className="mt-4">Change</Button>
        </fieldset>
      </form>
    </>
  );
};

export default ChangePasswordDialog;
