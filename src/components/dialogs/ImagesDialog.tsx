"use client";

import { FC, useState } from "react";
import useSWR from "swr";
import { Photos } from "@prisma/client";
import Image from "next/image";
import { toast } from "sonner";
import { DialogHeader } from "~/components/ui/dialog";
import { Button, ButtonLoader } from "~/components/ui/button";
import {User} from '~/types'
import { api } from "~/trpc/react";
import { ScrollArea } from "../ui/scroll-area";
interface ImagesDialogProps {
  user: User;
}

const ImagesDialog: FC<ImagesDialogProps> = ({ user }) => {
  const photos = api.photos.getPhotos.useQuery();
  const auth = api.auth.changeImage.useMutation();

  const [selected, setSelected] = useState<string | null>(null);

  const handleChangeImage = async () => {
    if (selected) {
      await auth.mutateAsync(selected, {
        onError: (err) => toast.error(err.message),
        onSuccess: () => toast("image updated"),
      });
    } else {
      toast.error("No image selected.",{style:{backgroundColor:"red",color:"white"}});
    }
  };

  const disableButton = auth.isLoading
    ? true
    : undefined || selected
      ? undefined
      : true;

  return (
    <>
      <DialogHeader>Change Image</DialogHeader>
      <ScrollArea className="h-52 mt-6">
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4  h-52 w-full p-1">
          {photos.data?.photos.map(({ url, uuid }) => (
            <button
              key={uuid}
              className={`relative rounded h-20 w-full ${
                selected === url && "outline outline-primary"
              }`}
              onClick={() => setSelected(url)}
            >
              <Image src={url} fill className="object-cover rounded" alt="" sizes="(max-width: 768px) 15vw, (max-width: 1200px) 10vw" />
            </button>
          ))}
        </div>
      </ScrollArea>

      <Button
        className="mt-4"
        disabled={auth.isLoading}
        onClick={() => handleChangeImage()}
      >
        <ButtonLoader/>
        Change
      </Button>
    </>
  );
};

export default ImagesDialog;
