"use client";

import { useModeStore } from "@/hooks/modeStore";
import Persitor from "./Persitor";
import { SessionProvider } from "next-auth/react";

const Providers = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) => {
  const { isDark } = useModeStore();

  return (
    <body className={`${isDark && "dark bg-black"} ${className}`}>
      <SessionProvider>
        <Persitor />
        {children}
      </SessionProvider>
    </body>
  );
};

export default Providers;
