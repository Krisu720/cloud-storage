"use client";

import { useModeStore } from "@/hooks/modeStore";

const Providers = ({ children }: { children: React.ReactNode }) => {
  const { isDark } = useModeStore();

  return <div className={`${isDark && "dark"}`}>{children}</div>;
};

export default Providers;
