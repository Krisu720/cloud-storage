"use client";

import { Upload, X } from "lucide-react";
import Dialog from "../ui/Dialog";
import { UploadDropzone } from "@/utils/uploadthing";
import "@uploadthing/react/styles.css";
const UploadButton = ({}) => {


  return (
    <Dialog>
      <Dialog.Button className="transition-colors hover:bg-black/20 rounded-full p-2 dark:text-white focus:outline outline-gray-100">
          <Upload />
      </Dialog.Button>
      <Dialog.Menu>
        <div className="flex items-center justify-between">
          <h1 className="text-xl dark:text-white font-bold">Upload Files</h1>
          <Dialog.Close className="p-2 hover:bg-black/20 rounded-full transition-colors">
            <X className="dark:text-white" />
          </Dialog.Close>
        </div>
        <UploadDropzone endpoint="imageUploader" />
      </Dialog.Menu>
    </Dialog>
  );
};

export default UploadButton;
