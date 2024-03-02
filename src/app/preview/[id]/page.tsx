"use client";

import {
  AtSign,
  Code,
  Download,
  Dumbbell,
  File,
  Link,
  MousePointerClick,
  Pen,
  QrCode,
  Rss,
  Scaling,
  User,
} from "lucide-react";
import Image from "next/image";
import QRCode from "react-qr-code";
import { motion } from "framer-motion";
import { useState } from "react";
import { DialogContent, DialogPortal } from "@radix-ui/react-dialog";
import { Dialog, DialogOverlay } from "~/components/ui/dialog";
import { Button, ButtonLoader } from "~/components/ui/button";
import { api } from "~/trpc/react";
import { download } from "~/lib/helpers";
import { toast } from "sonner";

type Block = {
  label: string;
  value: string | null;
  icon: JSX.Element;
};

const page = ({ params }: { params: { id: string } }) => {
  const [preview, setPreview] = useState(false);
  const photo = api.photos.getSharedPhoto.useQuery(params.id);

  return (
    <>
      <Dialog onOpenChange={setPreview} open={preview}>
        <DialogPortal>
          <DialogOverlay />
          <DialogContent>
            <motion.img
              key={JSON.stringify(preview)}
              onClick={() => setPreview((prev) => !prev)}
              draggable="false"
              layoutId="preview"
              sizes="100vw"
              // src="/watermarknew.png"
              src={`/api/public/${params.id}`}
              className="object-contain h-screen w-screen fixed z-50 inset-0"
              alt="preview"
            />
          </DialogContent>
        </DialogPortal>
      </Dialog>
      <div className="grid grid-cols-12 sm:h-screen px-2">
        <div className="relative lg:col-span-9 sm:col-span-7 col-span-12 overflow-hidden h-96 sm:h-auto">
          {!preview && (
            <>
              <motion.img
                key={JSON.stringify(preview)}
                draggable="false"
                layoutId="preview"
                onClick={() => setPreview((prev) => !prev)}
                sizes="100vw"
                // src="/watermarknew.png"
                src={`/api/public/${params.id}`}
                className="object-cover w-full h-full"
                alt="preview"
              />
              <div className="absolute z-10 right-0 left-0 top-0 flex h-40 bg-gradient-to-t from-transparent to-black p-6">
                <div className="flex w-full">
                  <MousePointerClick className="mr-2" /> Click to preview
                </div>
              </div>
            </>
          )}
        </div>
        <div className="lg:col-span-3 sm:col-span-5 col-span-12 sm:ml-4 mt-2 sm:mt-0">
          <div className="flex flex-col">
            {/* <div className="grid gap-2 sm:gap-4">
              {author.map((item) => (
                <MiniCard key={item.label} {...item} />
              ))}
            </div> */}
            <div className="grid gap-2 sm:gap-4">
              {photo.data && (
                <>
                  <MiniCard
                    key={photo.data.uuid}
                    label="Name"
                    icon={<Pen />}
                    value={photo.data.name?.split(".")[0] || null}
                  />
                  <MiniCard
                    key={photo.data.uuid}
                    label="Format"
                    icon={<File />}
                    value={photo.data.name?.split(".")[1] || null}
                  />
                  <MiniCard
                    key={photo.data.uuid}
                    label="Size"
                    icon={<Dumbbell />}
                    value={
                      Math.round((photo.data.size / 1024 / 1024) * 100) / 100 +
                      "MB"
                    }
                  />
                  <MiniCard
                    key={photo.data.uuid}
                    label="Publish Date"
                    icon={<Rss />}
                    value={photo.data.updatedAt.toLocaleDateString()}
                  />
                </>
              )}
            </div>
            <div className="bg-secondary  p-2 rounded-lg mt-4">
              <div className="flex gap-2 items-center">
                <div className="bg-background p-2 rounded-2xl">
                  <QrCode />
                </div>
                <h1>Qr code</h1>
              </div>
              <QRCode
                className="bg-secondary p-2 rounded-xl  w-full  "
                size={150}
                fgColor="white"
                bgColor="transparent"
                value={window.location.href}
              />
            </div>
            <div className="flex flex-col gap-2 sm:gap-4 mt-4">
              <Button
                variant="secondary"
                onClick={() => {
                  download([
                    { url: `/api/public/${params.id}`, name: photo.data?.name },
                  ]);
                  toast.success("Downloading photo.");
                }}
              >
                <Download className="mr-2 size-4" />
                Download
              </Button>
              <Button
                variant="secondary"
                onClick={() => {
                  toast.success("Copied link to clipboard.");
                  navigator.clipboard.writeText(window.location.href);
                }}
              >
                <Link className="mr-2 size-4" />
                Copy link
              </Button>
              <Button
                variant="secondary"
                onClick={() => {
                  toast.success("Copied source link to clipboard.");
                  navigator.clipboard.writeText(
                    window.location.host + `/api/public/${params.id}`
                  );
                }}
              >
                <Code className="mr-2 size-4" />
                Copy source link
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const MiniCard = ({ icon, label, value }: Block) => {
  return (
    <div className="bg-secondary  p-2 rounded-lg">
      <div className="flex gap-2 items-center">
        <div className="bg-background p-2 rounded-2xl">{icon}</div>
        <h1>{label}</h1>
      </div>
      <h1 className="mt-2 font-semibold ">{value ?? "-"}</h1>
    </div>
  );
};

export default page;
