"use client";

import { useModeStore } from "@/hooks/modeStore";
import { SessionProvider } from "next-auth/react";
import { useEffect } from "react";

const Providers = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) => {

  const { isDark, setMode } = useModeStore();

  useEffect(() => {
    const storage = localStorage.getItem("dark");
    if (storage) {
      const { dark }: { dark: boolean } = JSON.parse(storage);
      setMode(dark);
    }
  }, []);

  return (
    <body className={`${isDark && "dark bg-black"} ${className}`}>
      <SessionProvider>
        {children}
      </SessionProvider>
    </body>
  );
};

export default Providers;
