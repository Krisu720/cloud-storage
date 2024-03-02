"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Input } from "~/components/ui/input";
import { api } from "~/trpc/react";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Button, ButtonLoader } from "../ui/button";
import { useRouter } from "next/navigation";
const RegisterForm = () => {
  const auth = api.auth.register.useMutation();

  const router = useRouter()

  const formSchema = z.object({
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

  type FormSchema = z.infer<typeof formSchema>;
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: FormSchema) {
    try {
      await auth.mutateAsync(
        { email: values.email, password: values.passwordForm.password },
        {
          onSuccess: () => {
            toast.success("Registered successfully!");
            router.refresh()
          },
          onError: ({ message }) => {
            toast.error(message, {
              style: { backgroundColor: "red", color: "white" },
            });
          },
        }
      );
    } catch (err) {}
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=" rounded-xl">
        <fieldset disabled={auth.isLoading} className="flex flex-col gap-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="example@example.com"
                    {...field}
                    type="email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="passwordForm.password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="***********" {...field} type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="passwordForm.confirm"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Repeat Password</FormLabel>
                <FormControl>
                  <Input placeholder="***********" {...field} type="password" />
                </FormControl>
                <FormMessage />
                {form.formState.errors.passwordForm?.root?.message && (
                  <h1 className="text-[0.8rem] font-medium text-destructive">{form.formState.errors.passwordForm.root.message}</h1>
                )}
              </FormItem>
            )}
          />
          <Button className="mt-4">
            <ButtonLoader />
            Register
          </Button>
        </fieldset>
      </form>
    </Form>
  );
};

export default RegisterForm;
