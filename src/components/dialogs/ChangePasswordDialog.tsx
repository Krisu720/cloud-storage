"use client";

import { FC, useState } from "react";
import Dialog from "../ui/Dialog";
import { Button, buttonVariants } from "../ui/Button";
import Heading from "../ui/Heading";
import { X } from "lucide-react";
import { Session } from "next-auth";
import { Input } from "../ui/Input";
import { useForm, SubmitHandler, set } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorSpan from "../ErrorSpan";
import { changePassword } from "@/lib/apiCalls";
import { AxiosError } from "axios";
import { useToast } from "@/hooks/toastStore";
import { cn } from "@/utils/stylingHelper";

interface ChangePasswordDialogProps {
  session: Session;
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

const ChangePasswordDialog: FC<ChangePasswordDialogProps> = ({ session }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof LoginValidator>>({
    resolver: zodResolver(LoginValidator),
  });


  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const handler: SubmitHandler<z.infer<typeof LoginValidator>> = async (
    data
  ) => {
    setLoading(true);
    try {
      const res = await changePassword(
        session.user.userId,
        data.password,
        data.passwordForm.confirm
      );
      toast({title: "Password has been changed."})
    } catch (e) {
      if (e instanceof AxiosError) {
        if (e.response?.statusText)
          toast({ title: e.response.statusText, type: "error" });
        else toast({ title: "Something went wrong.", type: "error" });
      }
    }
    setLoading(false);
  };

  return (
    <Dialog>
      <Dialog.Button className={cn(buttonVariants({size: "small"}))}>
        Change password
      </Dialog.Button>
      <Dialog.Menu>
        <div className="flex justify-between">
          <Heading size="xl" weight="bold">
            Change Password
          </Heading>
          <Dialog.Close className="p-2  hover:bg-black/20 rounded-full transition-colors">
            <X className="dark:text-white" />
          </Dialog.Close>
        </div>
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
            <Button variant="success" className="mt-4">
              Change
            </Button>
          </fieldset>
        </form>
      </Dialog.Menu>
    </Dialog>
  );
};

export default ChangePasswordDialog;
