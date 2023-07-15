"use client";

import { Dispatch, FC, SetStateAction } from "react";
import { X } from "lucide-react";
import Heading from "../ui/Heading";
import Dialog from "../ui/Dialog";
import { Session } from "next-auth";
import Image from "next/image";
import ImagesDialog from "./ImagesDialog";
import ChangePasswordDialog from "./ChangePasswordDialog";

interface SettingsDialogProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  session: Session;
}

const SettingsDialog: FC<SettingsDialogProps> = ({
  open,
  setOpen,
  session,
}) => {
  return (
    <Dialog open={open} setOpen={setOpen}>
      <Dialog.Menu>
        <div className="relative">
          <Dialog.Close className="p-2 hover:bg-black/20 rounded-full transition-colors absolute top-2 right-2">
            <X className="dark:text-white" />
          </Dialog.Close>
          <div className="flex flex-col gap-4">
            <Heading size="xl" weight="bold">
              Account
            </Heading>
            <div className="flex gap-2 items-center mt-2">
              <div
                className={`w-14 h-14  cursor-pointer relative rounded-full overflow-hidden ${
                  session.user.image ? "" : "dark:bg-white bg-black "
                }`}
              >
                {session.user.image && (
                  <Image
                    src={session.user.image}
                    className="object-cover"
                    fill
                    alt="avatar"
                  />
                )}
                {session.user.email && (
                  <span className="flex items-center justify-center h-full w-full md:text-2xl text-lg uppercase text-white dark:text-black">
                    {session.user.email[0]}
                  </span>
                )}
              </div>
              <Heading size="lg">{session.user.email} </Heading>
            </div>
            <div className="flex gap-2 mt-4">
              <ChangePasswordDialog session={session} />
              <ImagesDialog session={session} />
            </div>
          </div>
        </div>
      </Dialog.Menu>
    </Dialog>
  );
};

export default SettingsDialog;
