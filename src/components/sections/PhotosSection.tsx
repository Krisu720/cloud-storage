"use client";

import { FC, useCallback, useState } from "react";
import PhotoPreview from "~/components/dialogs/PhotoPreview";
import { AnimatePresence, motion } from "framer-motion";
import { SortedPhotos } from "../../types";
import { format } from "date-fns";
import { useSelected } from "~/hooks/selectedStore";
import { Photos } from "@prisma/client";
import SelectPopup from "../SelectPopup";
import { cn } from "~/lib/utils";
import React from "react";
import { MousePointerClick } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import Image from "next/image";
interface PhotosSectionProps {
  photos: SortedPhotos;
}
const PhotosSection: FC<PhotosSectionProps> = ({ photos: sortedPhotos }) => {
  const { setSelected } = useSelected();

  const [selectMode, setSelectMode] = useState<boolean>(false);
  const [selectModePhotos, setSelectModePhotos] = useState<Photos[]>([]);

  const photos = Object.values(sortedPhotos).flatMap((year) =>
    Object.values(year).flatMap((month) => month.map((obj) => obj)),
  );

  const switchSelectMode = useCallback(() => {
    setSelectMode((prev) => {
      if (prev) {
        setSelectModePhotos([]);
      }
      return !prev;
    });
  }, []);

  const checkIfExist = (array: unknown[], find: unknown) => {
    const returned = array.find((found) => found === find);
    return returned ? true : false;
  };

  const onClick = (item: Photos) => {
    if (selectMode) addItem(item);
    else setSelected(item);
  };

  const addItem = (item: Photos) => {
    setSelectModePhotos((prev) => {
      if (checkIfExist(prev, item)) {
        const filtered = prev.filter((i) => i.uuid !== item.uuid);
        return filtered;
      } else {
        return [...prev, item];
      }
    });
  };

  return (
    <div>
      <AnimatePresence>
        {!selectMode && (
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <motion.button
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  className="fixed bottom-5 left-5  z-20 flex items-center justify-center rounded-full bg-primary p-4"
                  onClick={() => switchSelectMode()}
                >
                  <MousePointerClick className="h-5 w-5 text-white" />
                </motion.button>
              </TooltipTrigger>
              <TooltipContent side="right">Select mode</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </AnimatePresence>

      <PhotoPreview photos={photos} />
      <AnimatePresence>
        {selectMode && (
          <SelectPopup
            selectModePhotos={selectModePhotos}
            switchSelectMode={switchSelectMode}
          />
        )}
      </AnimatePresence>
      {Object.keys(sortedPhotos).map((year) => (
        <div key={year} id={year}>
          <h1 className="my-4 text-sm font-bold leading-none text-gray-500">
            {year}
          </h1>
          {Object.keys(sortedPhotos[year]).map((month) => (
            <React.Fragment key={month}>
              <h1
                id={year + month}
                className="my-4 text-3xl font-extrabold leading-none tracking-tighter"
              >
                {format(new Date(2000, parseInt(month) - 1), "MMMM")}
              </h1>
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-8">
                {sortedPhotos[year][month].map((item, index) => (
                  <h1 key={index}>
                    <motion.div
                      transition={{ duration: 0.1 }}
                      animate={
                        selectMode
                          ? checkIfExist(selectModePhotos, item)
                            ? {
                                padding: 0,
                              }
                            : { padding: 20 }
                          : undefined
                      }
                      className={cn(
                        checkIfExist(selectModePhotos, item) &&
                          "border-2 border-primary",
                      )}
                    >
                      <motion.button
                        key={item.uuid}
                        initial={{ y: 25, opacity: 0 }}
                        animate={{
                          y: 0,
                          opacity: 1,
                          transition: { delay: index * 0.05 },
                        }}
                        onClick={() => onClick(item)}
                        className="relative flex aspect-square w-full items-center justify-center rounded shadow"
                      >
                        {item.publicId && (
                          <div className="absolute right-2 top-2 z-10 h-5 w-5 animate-pulse rounded-full bg-green-500" />
                        )}
                        <Image
                          draggable="false"
                            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 20vw, 10vw"
                          src={item.url}
                          alt={item.name ?? "photo"}
                          fill
                          className="object-cover"
                        />
                      </motion.button>
                    </motion.div>
                  </h1>
                ))}
              </div>
            </React.Fragment>
          ))}
        </div>
      ))}
    </div>
  );
};

export default PhotosSection;
{
  /* <div className="p-2 rounded-xl border mt-4 sticky top-5 z-50 dark:bg-black bg-white">
        <Button
          variant={selectMode ? "default" : "outline"}
          onClick={() => switchSelectMode()}
        >
          <MousePointerClick className="h-5 w-5 mr-2" />
          Select{" "}
        </Button>
      </div> */
}
