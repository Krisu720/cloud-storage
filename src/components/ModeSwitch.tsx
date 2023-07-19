"use client";

import { useState } from "react";
import { SunIcon, MoonIcon } from "lucide-react";
import { motion } from "framer-motion";
import { useModeStore } from "@/hooks/modeStore";

const ModeSwitch = ({}) => {
  const { isDark, setMode } = useModeStore();
  const [dark, setDark] = useState<boolean>(isDark);

  const handleMode = () => {
    setDark((prev) => !prev);
    setMode(!dark)
    localStorage.setItem("dark", JSON.stringify({ dark: !dark }));
  };

  return (
    <motion.button
      className="h-8 w-14 border-black flex items-center p-1 border-2 rounded-full dark:border-white dark:justify-end"
      onClick={() => handleMode()}
    >
      <motion.div
        transition={{ duration: 0.1 }}
        layout
        className="h-6 w-6 rounded-full bg-black dark:bg-white"
      >
        {dark ? (
          <MoonIcon className="text-white dark:text-black p-1" />
        ) : (
          <SunIcon className="text-white dark:text-black p-1" />
        )}
      </motion.div>
    </motion.button>
  );
};

export default ModeSwitch;
