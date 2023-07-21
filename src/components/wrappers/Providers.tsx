"use client";

import { SessionProvider } from "next-auth/react";
import Toaster from "../ui/Toaster";

const Providers = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) => {
  return (
    <SessionProvider>
      <Toaster />
      {children}
    </SessionProvider>
  );
};

export default Providers;
