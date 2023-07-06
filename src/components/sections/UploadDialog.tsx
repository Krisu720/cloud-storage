"use client";

import { FC, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";
import { UploadDropzone } from "@/utils/uploadthing";
import "@uploadthing/react/styles.css";
import { useModeStore } from "@/hooks/modeStore";
import { X } from "lucide-react";

interface UploadDialogProps {
  children: React.ReactNode;
}

const UploadDialog: FC<UploadDialogProps> = ({ children }) => {
  const [open, setOpen] = useState<boolean>(false);
  const { isDark } = useModeStore();

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay />
            <Dialog.Content className={isDark ? "dark" : ""} forceMount>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-black/50 fixed inset-0 z-20"
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-white dark:bg-neutral-800 rounded-xl fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 p-6"
                >
                  <div className="flex items-center justify-between">
                    <Dialog.Title className="text-xl dark:text-white font-bold">
                      Upload Files
                    </Dialog.Title>
                    <Dialog.Close className="p-2 hover:bg-black/20 rounded-full transition-colors">
                      <X className="dark:text-white" />
                    </Dialog.Close>
                  </div>
                  <UploadDropzone endpoint="imageUploader" />
                </motion.div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
};

export default UploadDialog;
