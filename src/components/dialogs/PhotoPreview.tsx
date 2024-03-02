"use client";

import { FC, useState, useEffect, useRef, useCallback } from "react";
import { AnimatePresence, motion, useTransform } from "framer-motion";
import { Photos } from "@prisma/client";
import PreviewToolbar from "../PreviewToolbar";
import Image from "next/image";
import * as Dialog from "@radix-ui/react-dialog";
import BottomPhotoSection from "../BottomPhotoSection";
import useRects from "~/hooks/useRects";
import useBreakPoint from "~/hooks/useBreakPoints";
import { useSelected } from "~/hooks/selectedStore";
import ArrowControls from "../ArrowControls";

interface PhotoPreviewProps {
  photos: Photos[];
}

const PhotoPreview: FC<PhotoPreviewProps> = ({ photos }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [widthBehind, setWidthBehind] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [rects,loadRects] = useRects({ ref: containerRef });
  const breakpoint = useBreakPoint();
  const { selected, setSelected } = useSelected();

  console.log("selected",selected)

  // const slide = selected ? photos.indexOf(selected) : 0;
  const slide = selected ? photos.findIndex((item)=>item.uuid === selected.uuid) : 0;

  useEffect(() => {
    if (selected && rects) setWidthBehind(slide * rects.width);
  }, [slide, rects?.width,open]);

  useEffect(()=>{loadRects()},[open])

  useEffect(() => {
    if (selected) {
      setOpen(true);
    } else if (!selected) {
      setOpen(false);
    }
  }, [selected]);

  const handleSlide = useCallback((direction: "right" | "left") => {
    if (direction === "right") {
      if (slide !== photos.length - 1) {
        const nextPhoto = photos.at(slide+1);
        setSelected(prev=>nextPhoto ? nextPhoto :prev)
      }
    } else if (direction === "left") {
      if (slide !== 0) {
        const prevPhoto = photos.at(slide-1);
        setSelected(prev=>prevPhoto ? prevPhoto :prev)
      }
    }
  },[slide,photos]);

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
                <PreviewToolbar />
                <BottomPhotoSection photos={photos} />
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="fixed inset-0 bg-black/80 flex justify-center items-center z-20 overflow-y-auto"
                >
                  <ArrowControls handleSlide={handleSlide}/>
                  <div
                    ref={containerRef}
                    // onLoad={()=>loadRects()}
                    className="h-full w-11/12 overflow-hidden"
                  >
                    <motion.div
                      key={JSON.stringify(rects)}
                      transition={{
                        duration: 0.2,
                        ease: [0.6, 0.01, 0.05, 0.95],
                      }}
                      // initial={{ x: -slide * 100 + "%" }}
                      // animate={{ x: -slide * 100 + "%", }}
                      initial={{ x: -widthBehind }}
                      animate={{ x: -widthBehind }}
                      dragConstraints={
                        typeof widthBehind === "number"
                          ? { right: -widthBehind, left: -widthBehind }
                          : undefined
                      }
                      drag="x"
                      // dragMomentum={true}
                      dragElastic={1}
                      onDragEnd={(e, i) => {
                        if (
                          i.velocity.x > 500 ||
                          (breakpoint === "sm"
                            ? i.offset.x > 150
                            : i.offset.x > 350)
                        ) {
                          handleSlide("left");
                        }
                        if (
                          i.velocity.x < -500 ||
                          (breakpoint === "sm"
                            ? i.offset.x < -150
                            : i.offset.x < -350)
                        ) {
                          handleSlide("right");
                        }
                      }}
                      exit={{ opacity: 0, y: 30 }}
                      className="flex h-full w-full"
                    >
                      {photos.map((item, index) => (
                        <div
                          key={item.uuid}
                          className="h-full w-full shrink-0 relative"
                        >
                          {index <= slide + 2 && index >= slide - 2 && (
                            <Image
                              draggable="false"
                              className="object-contain"
                              src={item.url}
                              alt={item.uuid}
                              fill
                            />
                          )}
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
