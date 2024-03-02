"use client";

import { Toaster } from "sonner";
import { TRPCReactProvider } from "~/trpc/react";
import SessionProvider from "./Session";

const Providers = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) => {
  return (
    <TRPCReactProvider>
      <SessionProvider>
        <Toaster />
        {children}
      </SessionProvider>
    </TRPCReactProvider>
  );
};

export default Providers;
