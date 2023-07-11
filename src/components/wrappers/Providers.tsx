"use client";

import { useModeStore } from "@/hooks/modeStore";
import Persitor from "../Persitor";

const Providers = ({ children,className }: { children: React.ReactNode,className:string }) => {
  const { isDark } = useModeStore();

  return <body className={`${isDark && "dark bg-black"} ${className}`}>
    <Persitor/>
    {children}
    </body>;
};

export default Providers;
