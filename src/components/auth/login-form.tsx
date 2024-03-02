"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Input } from "~/components/ui/input";
import { api } from "~/trpc/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button, ButtonLoader, buttonVariants } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { useSession } from "~/hooks/useSession";

const LoginForm = () => {
  const auth = api.auth.login.useMutation();

  const {setUser} = useSession()

  const router = useRouter();

  const formSchema = z.object({
    email: z.string().email(),
    password: z
      .string()
      .min(5, { message: "Password must contain at least 5 character(s)" }),
  });

  type FormSchema = z.infer<typeof formSchema>;
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: FormSchema) {
    try {
      await auth.mutateAsync(
        { ...values },
        {
          onSuccess: (user) => {
            toast.success("Logged in successfully!");
            setUser(user)
            router.push("/");
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
    <div className="flex flex-col">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
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
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="***********"
                      {...field}
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={auth.isLoading} className="mt-4">
              Login
              <ButtonLoader />
            </Button>
          </fieldset>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
