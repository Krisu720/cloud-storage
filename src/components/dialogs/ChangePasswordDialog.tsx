"use client";

import { FC, useState } from "react";
import Dialog from "../ui/Dialog";
import { Button } from "../ui/Button";
import Heading from "../ui/Heading";
import { X } from "lucide-react";
import { Session } from "next-auth";
import { Input } from "../ui/Input";
import { useForm } from "react-hook-form";

interface ChangePasswordDialogProps {
  session: Session;
}

interface Inputs {
    previousPassword: string;
    password: string;
    repeatPassword: string;
  }

const ChangePasswordDialog: FC<ChangePasswordDialogProps> = ({ session }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<Inputs>();
    
      const [loading, setLoading] = useState(false);
    
     
  return (
    <Dialog>
      <Dialog.Button>
      <Button size="small" >Change password</Button>
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
        <form>
        <fieldset  className="group space-y-2 mt-4">
        <label className="flex flex-col dark:text-white ">
          <span className=" text-sm">Previous password</span>
          <Input
            type="password"
            {...register("previousPassword", { required: "Email is required" })}
          />
          {errors?.previousPassword && (
            <span className="my-1 text-red-500 text-sm">
              {errors.previousPassword.message}
            </span>
          )}
        </label>
        <label className="flex flex-col dark:text-white">
          <span className="text-sm">New password</span>
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
        <label className="flex flex-col dark:text-white">
          <span className="text-sm">Repeat new password</span>
          <Input
            type="password"
            {...register("repeatPassword", {
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
        
          <div className="border border-red-700 bg-red-300 rounded-xl p-3 font-semibold mt-2">
            Account with this email exist
          </div>
       <Button
          variant="success"
          className="mt-4"
        >
          Change
        </Button>
      </fieldset>
        </form>
        
      </Dialog.Menu>
    </Dialog>
  );
};

export default ChangePasswordDialog;
