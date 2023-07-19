"use client";

import { FC, useState } from "react";
import Dialog from "../ui/Dialog";
import { Button } from "../ui/Button";
import Heading from "../ui/Heading";
import { X } from "lucide-react";
import { Session } from "next-auth";
import { Input } from "../ui/Input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorSpan from "../ErrorSpan";

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

 

  const handler = async () => {
    setLoading(true);
    setTimeout(()=>setLoading(false),1000)
    
  };

  return (
    <Dialog>
      <Dialog.Button>
        <Button size="small">Change password</Button>
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
