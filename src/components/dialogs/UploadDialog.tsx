"use client";

import { UploadDropzone } from "~/lib/uploadthing";
import "@uploadthing/react/styles.css";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { DialogHeader } from "../ui/dialog";


const UploadDialog = ({}) => {
  const router = useRouter();
  return (
    <>
      <DialogHeader>Upload Photos</DialogHeader>
      <UploadDropzone
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          toast("Images have been uploaded");
          setTimeout(() => {
            router.refresh();
          }, 2500);
        }}
      />
    </>
  );
};

export default UploadDialog;
