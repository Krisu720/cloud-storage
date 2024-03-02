"use client";

import { Database, Image, Share2 } from "lucide-react";
import { UploadDropzone } from "~/lib/uploadthing";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const Banner = ({
  info,
}: {
  info: {
    size: number;
    number: number;
    sharedNumber: number;
  };
}) => {
  const router = useRouter();

  return (
    <div className="grid gap-2 grid-cols-3 md:grid-cols-5">
      <div className="col-span-3 grid grid-cols-3 h-full gap-2">
        <div className="bg-secondary  flex flex-col items-start p-4 rounded-2xl">
          <div className="dark:bg-background bg-white p-4 rounded-2xl">
            <Database />
          </div>
          <h1 className="mt-2">Storage</h1>
          <h1 className="mt-auto text-lg md:text-2xl md:font-semibold ">
            {Math.round(info.size * 100) / 100}MB
          </h1>
        </div>
        <div className="bg-secondary  flex flex-col items-start p-4 rounded-2xl">
          <div className="bg-background p-4 rounded-2xl">
            <Image />
          </div>
          <h1 className="mt-2">Photos</h1>
          <h1 className="mt-auto text-lg md:text-2xl md:font-semibold ">
            {info.number}
          </h1>
        </div>
        <div className="bg-secondary  flex flex-col items-start p-4 rounded-2xl">
          <div className="bg-background p-4 rounded-2xl">
            <Share2 />
          </div>
          <h1 className="mt-2">Shared</h1>
          <h1 className="mt-auto text-lg md:text-2xl md:font-semibold ">
            {info.sharedNumber}
          </h1>
        </div>
      </div>
      <div className="col-span-3  md:col-span-2 bg-secondary  p-4 rounded-2xl">
        <h1>
          Upload photos{" "}
          <span className="text-gray-500 text-xs ml-2">
            Images up to 16MB, max 10
          </span>{" "}
        </h1>
        <UploadDropzone
          className="rounded-2xl"
          appearance={{
            allowedContent: { display: "none" },
          }}
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            toast("Images have been uploaded");
            setTimeout(() => {
              router.refresh();
            }, 2500);
          }}
        />
      </div>
    </div>
    // <div className="flex snap-x snap-mandatory   overflow-x-auto  gap-2 ">
    //   <div className="border rounded-xl py-4 px-3 md:py-6 md:px-5 w-11/12 md:w-1/3 snap-center flex-shrink-0 md:flex-shrink">
    //     <h1 size="xl" weight="semibold">
    //       Usage
    //     </h1>
    //     <h1 variant="secondary">Total</h1>
    //     <h1 size="xl" weight="bold" className="mt-3">
    //       {Math.round(info.size * 100) / 100}MB
    //     </h1>
    //   </div>
    //   <div className="border rounded-xl py-4 px-3 md:py-6 md:px-5 w-11/12 md:w-1/3 snap-center flex-shrink-0 md:flex-shrink">
    //     <h1 size="xl" weight="semibold">
    //       Total Photos
    //     </h1>
    //     <h1 variant="secondary">All time</h1>
    //     <h1 size="xl" weight="bold" className="mt-3">
    //       {info.number}
    //     </h1>
    //   </div>
    //   <div className="border rounded-xl py-4 px-3 md:py-6 md:px-5 w-11/12 md:w-1/3 snap-center flex-shrink-0 md:flex-shrink">
    //     <h1 size="xl" weight="semibold">
    //       Shared Photos
    //     </h1>
    //     <h1 variant="secondary">Total</h1>
    //     <h1 size="xl" weight="bold" className="mt-3">
    //       {info.sharedNumber}
    //     </h1>
    //   </div>
    // </div>
  );
};

export default Banner;
