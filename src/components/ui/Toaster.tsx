"use client";

import { useToast } from "@/hooks/toastStore";
import { FC } from "react";
import { AnimatePresence, Variants, motion } from "framer-motion";

const animation: Variants = {
  initial: {
    opacity: 0,
    x: 50,
  },
  animate: {
    opacity: 1,
    x: 0,
  },
  exit: {
    opacity: 0,
    x: 150,
  },
};

const Toaster: FC = ({}) => {
  const { toastInfo } = useToast();

  return (
    <AnimatePresence>
      {toastInfo && (
        <motion.div
        {...animation}
          className={`fixed bottom-5 right-5 p-3 rounded shadow z-50 dark:text-white ${
            toastInfo.type === "error"
              ? "bg-red-500 border border-red-800"
              : " bg-green-500 border border-green-800 "
          }`}
        >
          {toastInfo.title}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toaster;
