"use client";

import { Dispatch, FC, SetStateAction, useState } from "react";
import { CalendarCheck, User2, X } from "lucide-react";
import { Button } from "../ui/Button";
import Heading from "../ui/Heading";
import Dialog from "../ui/Dialog";

interface SettingsDialogProps {
  children?: React.ReactNode;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const SettingsDialog: FC<SettingsDialogProps> = ({ children,open,setOpen }) => {
  return (
    <Dialog open={open} setOpen={setOpen}>
      <Dialog.Menu>
        <div className="grid grid-cols-4 divide-x">
          <div className="col-span-1 flex flex-col gap-2 pr-2">
            <div className="flex gap-2 bg-gray-200 rounded-lg p-2 dark:text-white dark:bg-black/40">
              <User2 /> Account
            </div>
            <div className="flex gap-2 rounded-lg p-2">
              <CalendarCheck />
              Active Plan
            </div>
          </div>
          <div className="col-span-3 relative px-6">
            <Dialog.Close className="p-2 hover:bg-black/20 rounded-full transition-colors absolute top-2 right-2">
              <X className="dark:text-white" />
            </Dialog.Close>
            <div className="divide-y flex flex-col gap-4">
              <div>
                <Heading size="xl" weight="bold">
                  Account
                </Heading>
                <div className="flex gap-2 items-center mt-2">
                  <div className="h-16 w-16 rounded-full bg-gray-300" />
                  <Heading size="lg">Krzysiek20131@gmail.com </Heading>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button>Change password</Button>
                  <Button>Change Image</Button>
                </div>
              </div>
              <div className="py-2">
                <Heading size="xl" weight="bold">
                  Active Plan
                </Heading>
                <div className="p-6 border rounded-lg mt-2">
                  <Heading weight="bold" size="lg">
                    2GB STORAGE
                  </Heading>
                  <Heading weight="bold">Days left: 20</Heading>
                  <Heading>Next billing date: 25.07.2023</Heading>
                </div>
                <Heading weight="bold" className="mt-4">
                  History of payments:
                </Heading>

                <div className="flex mt-2">
                  <Heading weight="semibold">25.06.2023</Heading>
                  <Heading className="ml-4">paypal</Heading>
                  <Heading className="ml-auto">10 PLN</Heading>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Dialog.Menu>
    </Dialog>
  );
};

export default SettingsDialog;
