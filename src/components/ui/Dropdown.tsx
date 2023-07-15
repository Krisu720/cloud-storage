"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import * as RadixDropdownMenu from "@radix-ui/react-dropdown-menu";
import { AnimatePresence, Variants, motion } from "framer-motion";

interface DropdownProps {
  children: React.ReactNode;
}

const animation: Variants = {
  initial: { opacity: 0, y: -5 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0 },
};

const DropdownContext = createContext<{
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  open: false,
  setOpen: () => {},
});

const Dropdown = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <DropdownContext.Provider value={{ open, setOpen }}>
      <RadixDropdownMenu.Root open={open} onOpenChange={setOpen}>
        {children}
      </RadixDropdownMenu.Root>
    </DropdownContext.Provider>
  );
};

const DropdownButton = ({ children }: { children: ReactNode }) => {
  return (
    <RadixDropdownMenu.Trigger asChild>{children}</RadixDropdownMenu.Trigger>
  );
};

Dropdown.Button = DropdownButton;

const DropdownMenu = ({ children }: { children: ReactNode }) => {
  const { open } = useContext(DropdownContext);
  return (
    <AnimatePresence>
      {open && (
        <RadixDropdownMenu.Portal forceMount>
          <RadixDropdownMenu.Content>
            <motion.div
              {...animation}
              className="py-3 bg-white dark:bg-neutral-800 shadow-2xl rounded  m-2"
            >
              {children}
            </motion.div>
          </RadixDropdownMenu.Content>
        </RadixDropdownMenu.Portal>
      )}
    </AnimatePresence>
  );
};

const DropdownItem = ({
  children,
  onSelect = () => {},
}: {
  children: ReactNode;
  onSelect?: () => void;
}) => {
  return (
    <RadixDropdownMenu.Item
      className="h-10 w-52 px-4 hover:bg-gray-100 dark:hover:bg-black/20 flex gap-2 items-center cursor-pointer hover:outline-none"
      onSelect={onSelect}
    >
      {children}
    </RadixDropdownMenu.Item>
  );
};

Dropdown.Item = DropdownItem;

Dropdown.Menu = DropdownMenu;


export default Dropdown;
