"use client";

import { useModeStore } from "@/hooks/modeStore";
import { FC, useEffect } from "react";

interface PersitorProps {}

const Persitor: FC<PersitorProps> = ({}) => {
  const { setMode } = useModeStore();

  useEffect(() => {
    const storage = localStorage.getItem("dark");
    if (storage) {
      const { dark }: { dark: boolean } = JSON.parse(storage);
      setMode(dark);
    }
  }, []);

  return <div></div>;
};

export default Persitor;
