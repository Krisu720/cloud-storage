"use client";

import { FC, useState } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { LogOut, Wrench } from "lucide-react";
import { useModeStore } from "@/hooks/modeStore";
import { AnimatePresence, motion } from "framer-motion";

interface AvatarDropdownProps {
  children: React.ReactNode;
}

const DropdownButton = ({ children }: { children: React.ReactNode }) => {
  return (
    <button className="h-10 w-52 px-4 hover:bg-gray-100 dark:hover:bg-black/20 flex gap-2 items-center">
      {children}
    </button>
  );
};

const AvatarDropdown: FC<AvatarDropdownProps> = ({ children }) => {
  const { isDark } = useModeStore();
  const [open, setOpen] = useState<boolean>(false);

  return (
    <DropdownMenu.Root open={open} onOpenChange={setOpen}>
      <DropdownMenu.Trigger asChild>{children}</DropdownMenu.Trigger>

      <AnimatePresence>
        {open && (
          <DropdownMenu.Portal forceMount>
            <DropdownMenu.Content className={isDark ? "dark" : ""}>
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="py-3 bg-white dark:bg-neutral-800 shadow-2xl rounded  m-2"
              >
                <DropdownMenu.Item>
                  <DropdownButton>
                    <Wrench className="dark:text-white" />{" "}
                    <span className="text-gray-900 dark:text-gray-100">
                      Account settings
                    </span>
                  </DropdownButton>
                </DropdownMenu.Item>
                <DropdownMenu.Item>
                  <DropdownButton>
                    <LogOut className="dark:text-white" />{" "}
                    <span className="text-gray-900 dark:text-gray-100">
                      Sign out
                    </span>
                  </DropdownButton>
                </DropdownMenu.Item>
              </motion.div>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        )}
      </AnimatePresence>
    </DropdownMenu.Root>
  );
};

export default AvatarDropdown;
