"use client";

import { FC, useState } from "react";
import Dialog from "../ui/Dialog";
import { Button } from "../ui/Button";
import Heading from "../ui/Heading";
import { X } from "lucide-react";
import useSWR from "swr";
import { Photos } from "@prisma/client";
import { changeImage, getPhotos, PHOTOS_ENDPOINT } from "@/lib/apiCalls";
import { Session } from "next-auth";
import Image from "next/image";
import { useSession } from "next-auth/react";
interface ImagesDialogProps {
  session: Session;
}

const ImagesDialog: FC<ImagesDialogProps> = ({ session }) => {
  const { data, isLoading, mutate } = useSWR<{ photos: Photos[] }>(
    PHOTOS_ENDPOINT+session.user.userId,
    () => getPhotos(session.user.userId)
  );

  const {update} = useSession()

  const [selected, setSelected] = useState<string | null>(null);

  const handleChangeImage = async () => {
    if (selected) {
      const res = await changeImage(session.user.userId, selected);
      console.log(res)
    }
  };

  return (
    <Dialog>
      <Dialog.Button>
        <Button size="small" variant="outlined">Change Image</Button>
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
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-8 gap-4 mt-6">
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
          disabled={selected ? undefined : true}
          onClick={() => handleChangeImage()}
        >
          Change
        </Button>
      </Dialog.Menu>
    </Dialog>
  );
};

export default ImagesDialog;
