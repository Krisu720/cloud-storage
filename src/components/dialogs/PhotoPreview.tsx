"use client";

import { FC, useState, useEffect } from "react";
import { AnimatePresence, motion, useTransform } from "framer-motion";
import { Photos } from "@prisma/client";
import PreviewToolbar from "../PreviewToolbar";
import Image from "next/image";
import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "../ui/Button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import BottomPhotoPreview from "../BottomPhotoPreview";

interface PhotoPreviewProps {
  selected: Photos | null;
  photos: Photos[];
  setSelected: React.Dispatch<React.SetStateAction<Photos | null>>;
}

const PhotoPreview: FC<PhotoPreviewProps> = ({
  selected,
  setSelected,
  photos,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [slide, setSlide] = useState<number>(0);


  useEffect(() => {
    if (selected) {
      setOpen(true);
      setSlide(photos.indexOf(selected));
    } else {
      setOpen(false);
    }
  }, [selected]);

  useEffect(() => {
    if (open) setSelected(photos[slide]);
  }, [slide]);

  // useEffect(() => {
  //   window.addEventListener("keydown", (e) => {
  //     if (e.key === "ArrowLeft") handleSlide("left");
  //     if (e.key === "ArrowRight") handleSlide("right");
  //   });
  // }, []);

  const handleSlide = (direction: "right" | "left") => {
    if (direction === "right") {
      if (slide === photos.length - 1) {
        setSlide(0);
      } else {
        setSlide(slide + 1);
      }
    } else if (direction === "left") {
      if (slide === 0) {
        setSlide(photos.length - 1);
      } else {
        setSlide(slide - 1);
      }
    }
  };

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
                className="relative z-20"
              >
                <PreviewToolbar setSelected={setSelected} selected={selected} />
                {/* <BottomPhotoPreview
                  setSelected={setSelected}
                  selected={selected}
                  photos={photos}
                /> */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="fixed inset-0 bg-black/80 flex justify-center items-center z-20 overflow-y-auto"
                >
                  <motion.button
                    initial={{ x: -100 }}
                    animate={{ x: 0 }}
                    exit={{ x: -100 }}
                    transition={{ type: "tween" }}
                    className="absolute top-1/2 -translate-y-1/2 left-5 z-30 p-3 rounded-full hover:bg-gray-100/10 text-white"
                    onClick={() => handleSlide("left")}
                  >
                    <ChevronLeft />
                  </motion.button>
                  <motion.button
                    initial={{ x: 100 }}
                    animate={{ x: 0 }}
                    exit={{ x: 100 }}
                    transition={{ type: "tween" }}
                    className="absolute top-1/2 -translate-y-1/2 right-5 z-30 p-3 rounded-full hover:bg-gray-100/10 text-white"
                    onClick={() => handleSlide("right")}
                  >
                    <ChevronRight />
                  </motion.button>
                  <div className="h-full w-11/12 overflow-hidden">
                    <motion.div
                      initial={{ x: -slide * 100 + "%" }}
                      animate={{ x: -slide * 100 + "%",transition:{duration:0.3,ease:[0.6, 0.01, -0.05, 0.95]} }}
                      exit={{ opacity: 0,y:30 }}
                      className="flex h-full w-full"
                    >
                      {photos.slice(slide,slide+3).map((item) => (
                        <div key={item.uuid} className="h-full w-full shrink-0 relative">
                          <Image
                            className="object-contain"
                            src={item.url}
                            alt={item.uuid}
                            fill
                          />
                        </div>
                      ))}
                    </motion.div>
                  </div>
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
