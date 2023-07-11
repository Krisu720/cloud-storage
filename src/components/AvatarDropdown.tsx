"use client";

import { LogOut, Wrench } from "lucide-react";
import Image from "next/image";
import Dropdown from "./ui/Dropdown";
import { signOut } from "next-auth/react";
import { useState } from "react";
import SettingsDialog from "./sections/SettingsDialog";

const AvatarDropdown = ({
  image,
  email,
}: {
  image?: string | null;
  email?: string | null;
}) => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  return (
    <>
      <SettingsDialog open={openDialog} setOpen={setOpenDialog} />

      <Dropdown>
        <Dropdown.Button>
          <div className="h-12 w-12 bg-orange-500 rounded-full cursor-pointer object-contain relative overflow-hidden">
            {image && <Image src={image} fill alt="avatar" />}
            {email && (
              <span className="flex items-center justify-center h-full w-full text-2xl uppercase text-white dark:text-black">
                {email[0]}
              </span>
            )}
          </div>
        </Dropdown.Button>
        <Dropdown.Menu>
          <Dropdown.Item onSelect={() => setOpenDialog(true)}>
            <Wrench className="dark:text-white" />
            <span className="text-gray-900 dark:text-gray-100">
              Account settings
            </span>
          </Dropdown.Item>
          <Dropdown.Item
            onSelect={() => signOut({ callbackUrl: "/", redirect: true })}
          >
            <LogOut className="dark:text-white" />{" "}
            <span className="text-gray-900 dark:text-gray-100">Sign out</span>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

export default AvatarDropdown;
