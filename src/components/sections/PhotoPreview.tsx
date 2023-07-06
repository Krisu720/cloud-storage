"use client";

import { FC, useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Photos } from "@prisma/client";
import PreviewToolbar from "../PreviewToolbar";
import Image from "next/image";
import * as Dialog from "@radix-ui/react-dialog";

interface PhotoPreviewProps {
  selected: Photos | null;
  setSelected: React.Dispatch<React.SetStateAction<Photos | null>>;
}

const PhotoPreview: FC<PhotoPreviewProps> = ({ selected, setSelected }) => {
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    if (selected) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [selected]);

  return (
    <Dialog.Root onOpenChange={setOpen} open={open}>
      <AnimatePresence>
        {open && selected && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay />
            <Dialog.Content>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <PreviewToolbar setSelected={setSelected} selected={selected} />
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/80 flex justify-center items-center z-10 overflow-y-auto"
                >
                  <motion.div className="relative md:h-[40rem] min-h-[30rem] w-[50rem]">
                    <Image
                      sizes="100vw"
                      src={selected.url}
                      fill
                      className="object-contain "
                      alt={selected.uuid}
                    />
                  </motion.div>
                </motion.div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
};

export default PhotoPreview;
/* {selected && (
        <>
          <PreviewToolbar setSelected={setSelected} selected={selected} />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex justify-center items-center z-10"
          >
            <motion.div className="relative md:h-[40rem] min-h-[30rem] w-[50rem]">
              <Image
                sizes="100vw"
                src={selected.url}
                fill
                className="object-contain "
                alt={selected.uuid}
              />
            </motion.div>
          </motion.div>
        </>
      )} */
