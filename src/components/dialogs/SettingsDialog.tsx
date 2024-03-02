"use client";

import ImagesDialog from "./ImagesDialog";
import ChangePasswordDialog from "./ChangePasswordDialog";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Github, Laptop2 } from "lucide-react";
import { Badge } from "../ui/badge";
import Image from "next/image";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "../ui/dialog";
import {User} from '~/types'

interface SettingsDialogProps {
  user: User;
}

const SettingsDialog: React.FC<SettingsDialogProps> = ({ user }) => {
  return (
    <>
      <DialogHeader>Account settings</DialogHeader>
      <div className="flex flex-col gap-4">
        <h1>Profile</h1>
        <div className="flex gap-2 items-center mt-2">
          <Avatar>
            <AvatarImage src={user.image ?? undefined} />
            <AvatarFallback>{user.email![0]}</AvatarFallback>
          </Avatar>
          <h1>{user.email} </h1>
        </div>
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Change password</Button>
            </DialogTrigger>
            <DialogContent>
              <ChangePasswordDialog user={user} />
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Change image</Button>
            </DialogTrigger>
            <DialogContent>
              <ImagesDialog user={user} />
            </DialogContent>
          </Dialog>
        </div>
        <h1>Connected accounts</h1>
        <div>
          {user.githubId ? (
            <div className="flex gap-2">
              <Github /> <h1>{user.username}</h1>
            </div>
          ) : (<h1 className="text-muted-foreground text-xs">No accounts connected</h1>)}
        </div>
        {/* <h1>Active devices</h1>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-secondary rounded p-2 flex">
            <Laptop2 className="h-10 w-10" />
            <div className="ml-2">
              <h1>Windows</h1>
              <div className="my-0.5">
                <h1 className="text-xs">Chrome 121.0.0.0</h1>
                <h1 className="text-xs">Dąbrowa Górnicza, PL</h1>
                <h1 className="text-xs">19.02.2024 @ 00:18:29</h1>
              </div>
              <Badge>Current device</Badge>
            </div>
          </div>
        </div> */}
        <div className="flex gap-2 mt-4"></div>
      </div>
    </>
  );
};

export default SettingsDialog;
