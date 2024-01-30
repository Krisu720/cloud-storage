"use client";

import { FC } from "react";
import { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ImageIcon, Trash } from "lucide-react";

interface FileDropAreaProps {
  className?: string;
  onChange: (file: File) => void;
  file: File | null;
  removeFile: () => void;
  url: string | null;
}

const FileDropArea: FC<FileDropAreaProps> = ({
  className,
  onChange,
  file,
  removeFile,
  url,
}) => {
  const [dragging, setDragging] = useState<boolean>(false);

  const fileInput = useRef<HTMLInputElement>(null);

  const dragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true);
  };

  const dropFunc = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const dt = e.dataTransfer.files?.[0];
    if (dt) {
      onChange(dt);
      toast({ title: "Dodano zdjęcie" });
    }
    dragEnd();
  };

  const dragEnd = () => {
    setDragging(false);
  };

  const selectFunc = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const dt = e.currentTarget.files?.[0];
    if (dt) {
      onChange(dt);
      toast({ title: "Dodano zdjęcie" });
    }
  };

  return file ? (
    <div className="flex space-x-4 items-center">
      <img
        src={url ? url : ""}
        className=" h-24 w-24 object-cover rounded-2xl"
      />
      <Button size="icon" variant="ghost" onClick={() => removeFile()}>
        <Trash className="h-8 w-8 text-red-500" />
      </Button>
    </div>
  ) : (
    <div className={cn("w-full rounded-3xl flex flex-col", className)}>
      <div
        onDragOver={(e) => dragStart(e)}
        onDrop={(e) => dropFunc(e)}
        onDragLeaveCapture={() => dragEnd()}
        className={cn(
          dragging
            ? "border-solid border-primary dark:bg-neutral-900 "
            : " border-dashed bg-background",
          "rounded-xl  flex flex-col items-center h-full justify-center w-full border-2 transition-colors"
        )}
      >
        <button
          className="text-sm text-primary h-full w-full p-4 flex flex-col justify-center items-center gap-2"
          onClick={()=>fileInput.current?.click()}
          type="button"
        >
          <ImageIcon className="dark:text-white text-primary" />
          Wybierz pliki lub przeciągnij je tutaj
        </button>
        <input
          multiple
          hidden
          type="file"
          ref={fileInput}
          onChange={(e) => selectFunc(e)}
        />
      </div>
    </div>
  );
};

export default FileDropArea;