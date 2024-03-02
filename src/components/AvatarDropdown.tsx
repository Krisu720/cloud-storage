"use client";

import { LogOut, Wrench, ImageIcon, Upload } from "lucide-react";
import { useState } from "react";
import SettingsDialog from "./dialogs/SettingsDialog";
import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

import UploadDialog from "./dialogs/UploadDialog";
import { User } from "lucia/dist/core";
import { Dialog, DialogContent } from "./ui/dialog";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import { toast } from "sonner";
import { useSession } from "~/hooks/useSession";

const AvatarDropdown = ({ user }: { user: User }) => {
  const [settings, setSettings] = useState<boolean>(false);
  const [upload, setUpload] = useState<boolean>(false);
  const {setUser} = useSession();
  const auth = api.auth.lougout.useMutation();
  const router = useRouter();
  const signOut = async () => {
    try {
      await auth.mutateAsync(undefined, {
        onSuccess: () => {
          toast("Successfully logged out");
          setUser(null);
          router.refresh();
          router.push("/login");
        },
        onError: ({ message }) => {
          toast.error(message, {
            style: { backgroundColor: "red", color: "white" },
          });
        },
      });
    } catch (err) {}
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar>
            <AvatarImage src={user.image ?? undefined} />
            <AvatarFallback>{user.email[0]}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem asChild>
            <Link href="/photos">
              <ImageIcon className="mr-2" />
              My photos
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => setUpload(true)}>
            <Upload className="mr-2" /> Upload
          </DropdownMenuItem>

          <DropdownMenuItem onSelect={() => setSettings(true)}>
            <Wrench className="mr-2" />
            Account settings
          </DropdownMenuItem>

          <DropdownMenuItem onSelect={() => signOut()}>
            <LogOut className="mr-2" /> <h1>Sign out</h1>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog open={settings} onOpenChange={setSettings}>
        <DialogContent>
          <SettingsDialog user={user} />
        </DialogContent>
      </Dialog>
      <Dialog open={upload} onOpenChange={setUpload}>
        <DialogContent>
          <UploadDialog />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AvatarDropdown;
