"use client";

import { SunIcon, MoonIcon } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

const ModeSwitch = ({}) => {
  const { theme, setTheme } = useTheme();

  const handleMode = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <motion.button
      className="md:h-8 md:w-14 h-6 w-10 border-black flex items-center p-1 border-2 rounded-full dark:border-white dark:justify-end"
      onClick={() => handleMode()}
    >
      <motion.div
        transition={{ duration: 0.1 }}
        layout
        className="h-4 w-4 md:h-6 md:w-6 rounded-full bg-black dark:bg-white flex items-center justify-center"
      >
        {theme === "dark" ? (
          <MoonIcon className="text-white dark:text-black p-1" />
        ) : (
          <SunIcon className="text-white dark:text-black p-1" />
        )}
      </motion.div>
    </motion.button>
  );
};

export default ModeSwitch;
