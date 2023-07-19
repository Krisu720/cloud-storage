"use client";

import { LogOut, Wrench, ImageIcon } from "lucide-react";
import Image from "next/image";
import Dropdown from "./ui/Dropdown";
import { signOut } from "next-auth/react";
import { useState } from "react";
import SettingsDialog from "./dialogs/SettingsDialog";
import Link from "next/link";
import { Session } from "next-auth";
import Heading from "./ui/Heading";

const AvatarDropdown = ({ session }: { session: Session }) => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  return (
    <>
      <SettingsDialog
        open={openDialog}
        setOpen={setOpenDialog}
        session={session}
      />

      <Dropdown>
        <Dropdown.Button>
          <div
            className={`md:h-12 md:w-12 w-8 h-8  cursor-pointer relative rounded-full overflow-hidden ${
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
              <Heading className="flex items-center justify-center h-full w-full md:text-2xl text-lg uppercase dark:text-black text-white">
                {session.user.email[0]}
              </Heading>
            )}
          </div>
        </Dropdown.Button>
        <Dropdown.Menu>
          <Link href="/photos">
            <Dropdown.Item>
              <ImageIcon className="dark:text-white" />
              <Heading >
                My gallery
              </Heading>
            </Dropdown.Item>
          </Link>
          <Dropdown.Item onSelect={() => setOpenDialog(true)}>
            <Wrench className="dark:text-white" />
            <Heading >
              Account settings
            </Heading>
          </Dropdown.Item>
          <Dropdown.Item
            onSelect={() => signOut({ callbackUrl: "/", redirect: true })}
          >
            <LogOut className="dark:text-white" />{" "}
            <Heading >Sign out</Heading>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

export default AvatarDropdown;
