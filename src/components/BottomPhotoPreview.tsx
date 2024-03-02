"use client";

import { Photos } from "@prisma/client";
import React, { FC } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "~/lib/utils";
import useBreakPoint from "~/hooks/useBreakPoints";

interface BottomPhotoPreviewProps {
  selected: Photos | null;
  setSelected: React.Dispatch<React.SetStateAction<Photos | null>>;
  photos: Photos[];
}

const smallBlock = 25 as const;
const currentBlock = 100 as const;
const hoverBlock = 65 as const;

const BottomPhotoPreview: FC<BottomPhotoPreviewProps> = ({
  photos,
  selected,
  setSelected,
}) => {
  const breakpoint = useBreakPoint();
  const fullWidth =
    photos.reduce((acc) => {
      return acc + smallBlock;
    }, 0) + currentBlock;

  const containerWidth = 640 as const;

  const widthBehind = selected && (photos.indexOf(selected) + 1) * smallBlock;

  return (
    breakpoint !== "sm" && (
      <motion.div
        className={cn(
          "fixed bottom-5 h-16 z-30 left-1/2  -translate-x-1/2 rounded-xl overflow-hidden w-[40rem]"
        )}
      >
        {widthBehind && (
          <motion.div
            animate={{
              x: -((containerWidth - fullWidth) * widthBehind * -1) / fullWidth,
              transition: { type: "tween" },
            }}
            className="w-full flex h-full"
          >
            {photos.map((item) => (
              <motion.button
                key={item.uuid}
                animate={{
                  width:
                    selected && selected?.uuid === item.uuid
                      ? currentBlock
                      : smallBlock,
                }}
                whileHover={{
                  width:
                    item.uuid === selected?.uuid ? currentBlock : hoverBlock,
                }}
                className="h-full shrink-0 relative hover:opacity-80 transition-opacity"
                onClick={() => setSelected(item)}
              >
                  <Image
                    className="object-cover"
                    src={item.url}
                    alt={item.uuid}
                    quality={50}
                    sizes="(max-width: 768px) 10vw, (max-width: 1200px) 5vw, 3vw"
                    fill
                  />
              </motion.button>
            ))}
          </motion.div>
        )}
      </motion.div>
    )
  );
};

export default BottomPhotoPreview;
