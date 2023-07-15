"use client";

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import * as RadixDialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";

const DialogContext = createContext<{
  isOpened: boolean;
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  isOpened: false,
  setIsOpened: () => {},
});

const Dialog = ({
  children,
  open,
  setOpen,
}: {
  children: ReactNode;
  open?: boolean;
  setOpen?: Dispatch<SetStateAction<boolean>>;
}) => {
  const [isOpened, setIsOpened] = useState<boolean>(false);

  if (typeof setOpen !== "undefined" && open) {
    return (
      <DialogContext.Provider value={{ isOpened: open, setIsOpened: setOpen }}>
        <RadixDialog.Root open={open} onOpenChange={setOpen}>
          {children}
        </RadixDialog.Root>
      </DialogContext.Provider>
    );
  } else {
    return (
      <DialogContext.Provider value={{ isOpened, setIsOpened }}>
        <RadixDialog.Root open={isOpened} onOpenChange={setIsOpened}>
          {children}
        </RadixDialog.Root>
      </DialogContext.Provider>
    );
  }
};

export default Dialog;

const DialogButton = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <RadixDialog.Trigger className={className}>{children}</RadixDialog.Trigger>
  );
};

Dialog.Button = DialogButton;

const DialogMenu = ({ children }: { children: ReactNode }) => {
  const { isOpened } = useContext(DialogContext);

  return (
    <AnimatePresence>
      {isOpened && (
        <RadixDialog.Portal forceMount>
          <RadixDialog.Overlay />
          <RadixDialog.Content forceMount>
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
                className="bg-white shadow-lg  dark:bg-neutral-800 rounded-xl w-full max-w-xl fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 p-6"
              >
                {children}
              </motion.div>
            </motion.div>
          </RadixDialog.Content>
        </RadixDialog.Portal>
      )}
    </AnimatePresence>
  );
};

Dialog.Menu = DialogMenu;

const DialogClose = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <RadixDialog.Close className={className}>{children}</RadixDialog.Close>
  );
};

Dialog.Close = DialogClose;
