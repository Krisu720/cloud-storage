"use client";

import { FC, useState } from "react";
import Dialog from "../ui/Dialog";
import { Button, buttonVariants } from "../ui/Button";
import Heading from "../ui/Heading";
import { X } from "lucide-react";
import useSWR from "swr";
import { Photos } from "@prisma/client";
import { changeImage, getPhotos, PHOTOS_ENDPOINT } from "@/lib/apiCalls";
import { Session } from "next-auth";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useToast } from "@/hooks/toastStore";
import { cn } from "@/utils/stylingHelper";
interface ImagesDialogProps {
  session: Session;
}

const ImagesDialog: FC<ImagesDialogProps> = ({ session }) => {
  const { data} = useSWR<{ photos: Photos[] }>(
    PHOTOS_ENDPOINT + session.user.userId,
    () => getPhotos(session.user.userId)
  );

  const { update, data: sessionData } = useSession();
  const { toast } = useToast();
  const [selected, setSelected] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false)


  const handleChangeImage = async () => {
    setLoading(true)
    if (selected) {
      const res = await changeImage(session.user.userId, selected);
      if (sessionData)
        await update({
          ...sessionData,
          user: {
            ...sessionData.user,
            picture: res.image,
          },
        });
      console.log(sessionData);
      toast({ title: "image updated" });
    }
    setLoading(false)
  };

  const disableButton = loading ? true : undefined || selected ? undefined : true

  return (
    <Dialog>
      <Dialog.Button className={cn(buttonVariants({size: "small",variant:"outlined"}))}>
          Change Image
      </Dialog.Button>
      <Dialog.Menu>
        <div className="flex justify-between">
          <Heading size="xl" weight="bold">
            Change Image
          </Heading>
          <Dialog.Close className="p-2  hover:bg-black/20 rounded-full transition-colors">
            <X className="dark:text-white" />
          </Dialog.Close>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 mt-6 h-52 overflow-y-auto p-1">
          {data?.photos.map(({ url, uuid }) => (
            <button
              key={uuid}
              className={`relative rounded h-20 w-full ${
                selected === uuid && "outline outline-sky-500"
              }`}
              onClick={() => setSelected(uuid)}
            >
              <Image src={url} fill className="object-cover rounded" alt="" />
            </button>
          ))}
        </div>
        
        <Button
          variant="success"
          className="mt-4"
          disabled={disableButton}
          onClick={() => handleChangeImage()}
        >
          Change
        </Button>
      </Dialog.Menu>
    </Dialog>
  );
};

export default ImagesDialog;
