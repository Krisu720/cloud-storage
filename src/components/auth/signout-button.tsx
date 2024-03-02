"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";
import { api } from "~/trpc/react";
import { Button } from "../ui/button";

const SignoutButton = () => {
  const auth = api.auth.lougout.useMutation();
  const router = useRouter();
  const handleClick = async () => {
    try {
      await auth.mutateAsync(undefined, {
        onSuccess: () => {
          toast("Successfully logged out");
          router.refresh();
          router.push("/login");
        },
        onError: ({ message }) => {
          toast.error(message, {
            style: { backgroundColor: "red", color: "white" },
          });
        },
      });
    } catch (err) {}
  };
  return (
    <Button onClick={() => handleClick()} disabled={auth.isLoading}>
      Logout user
    </Button>
  );
};

export default SignoutButton;
