import { Photos } from "@prisma/client";
import { Download, Trash2, X } from "lucide-react";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { download } from "~/lib/helpers";
import { toast } from "sonner";
import { Button, ButtonLoader } from "./ui/button";
import useBreakPoint from "~/hooks/useBreakPoints";
import { cn } from "~/lib/utils";
import { api } from "~/trpc/react";

interface SelectPopupProps {
  selectModePhotos: Photos[];
  switchSelectMode: () => void;
}

const SelectPopup = ({
  selectModePhotos,
  switchSelectMode,
}: SelectPopupProps) => {
  const photo = api.photos.deletePhotos.useMutation();

  const breakpoint = useBreakPoint();
  const router = useRouter();

  const handleDownload = () => {
    download(selectModePhotos.map((photo) => ({url: photo.url, name: photo.name})));
    toast(`Downloading ${selectModePhotos.length} files.`);
    switchSelectMode();
  };

  const handleDelete = async () => {
    await photo.mutateAsync(
      selectModePhotos.map(({ uuid }) => uuid),
      {
        onError: (err) => toast.error(err.message),
        onSuccess: () => {
          toast(`Deleted ${selectModePhotos.length} files.`);
          switchSelectMode();
          router.refresh();
        },
      }
    );
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed px-5 bg-primary-foreground z-50 bottom-0 left-0 right-0 h-14 shadow"
    >
      <fieldset
        disabled={photo.isLoading}
        className="flex flex-row h-full items-center my-auto"
      >
        <Button size="icon" variant="ghost" onClick={() => switchSelectMode()}>
          <X />
        </Button>
        <h1 className="mx-2 font-semibold text-xl">
          Selected: {selectModePhotos.length}
        </h1>
        <div className="space-x-2 ml-auto">
          <Button
            size={breakpoint !== "sm" ? "sm" : "icon"}
            onClick={() => handleDownload()}
          >
            <ButtonLoader/>
            <Download
              className={cn("h-5 w-5", breakpoint !== "sm" && "mr-2")}
            />
            {breakpoint !== "sm" && "Download selected "}
          </Button>
          <Button
            size={breakpoint !== "sm" ? "sm" : "icon"}
            onClick={() => handleDelete()}
          >
            <ButtonLoader/>
            <Trash2 className={cn("h-5 w-5", breakpoint !== "sm" && "mr-2")} />
            {breakpoint !== "sm" && "Delete selected "}
          </Button>
        </div>
      </fieldset>
    </motion.div>
  );
};

export default SelectPopup;
