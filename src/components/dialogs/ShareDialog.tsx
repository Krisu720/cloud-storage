"use client";

import { FC, useEffect, useState } from "react";
import Heading from "../ui/Heading";
import Dialog from "../ui/Dialog";
import { Input } from "../ui/Input";
import { AlertTriangle, Check, Clipboard, Loader2, X } from "lucide-react";
import { Button } from "../ui/Button";
import { AnimatePresence, Variants, motion } from "framer-motion";
import { Photos } from "@prisma/client";
import { setPublicPhoto, removePublicPhoto } from "@/lib/apiCalls";
import { useSession } from "next-auth/react";
import {useRouter} from 'next/navigation'
import { useToast } from "@/hooks/toastStore";
interface ShareDialogProps {
  selected: Photos;
  setSelected: React.Dispatch<React.SetStateAction<Photos | null>>;
}

const ShareDialog: FC<ShareDialogProps> = ({
  selected,
  setSelected,
}) => {
  const router = useRouter()
  const session = useSession();
  const {toast} = useToast()
  const [status, setStatus] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const copyText = () => {
    if (selected.publicId) {
      navigator.clipboard.writeText(
        `${window.location.origin}/preview/${selected.publicId}`
      );
      setCopied(true);
    }
    toast({title: "Copied to clipboard."})
  };

  const setPublic = async () => {
    if (session.data?.user.userId) {
      setLoading(true);
      const res = await setPublicPhoto(session.data.user.userId, selected.uuid);
      router.refresh()
      console.log("res",res)
      setSelected(res);
      setLoading(false);
    }
    toast({title: "This photo is public now."})
  };

  const removePublic = async () => {
    if (session.data?.user.userId) {
      setLoading(true);
      const res = await removePublicPhoto(
        session.data.user.userId,
        selected.uuid
      );
      console.log(res);
      router.refresh()
      setSelected(res);
      setLoading(false);
    }
    toast({title: "This photo is not public anymore."})
  };

  useEffect(() => {
    setStatus(selected.publicId);
  }, [selected]);

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex gap-2 w-full items-center">
          <Heading size="xl" weight="bold">
            Share
          </Heading>
          {status ? (
            <Button
              size="small"
              variant="danger"
              onClick={() => removePublic()}
              className="flex items-center gap-2"
            >
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              Stop sharing photo
            </Button>
          ) : (
            <Button
              size="small"
              variant="success"
              onClick={() => setPublic()}
              className="flex items-center gap-2"
            >
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              Share photo
            </Button>
          )}
        </div>
        <Dialog.Close className="p-2  hover:bg-black/20 rounded-full transition-colors">
          <X className="dark:text-white" />
        </Dialog.Close>
      </div>
      <div className="mt-2">
        {status ? (
          <Heading className="text-yellow-600 dark:text-yellow-600 flex gap-2 items-center">
            <AlertTriangle className="h-6 w-6 flex-shrink-0" />
            Everyone who have the link can access this photo.
          </Heading>
        ) : (
          <>
            <Heading variant="secondary" size="lg" weight="semibold">
              Share your photo to someone using external link.
            </Heading>
            <div className="flex flex-col items-center justify-center text-center mt-6">
              <AlertTriangle className="text-red-500 dark:text-red-600 h-8 w-8" />
              <Heading className="text-red-500 dark:text-red-600 flex gap-3 items-center">
                If you share photo everyone who has unique link<br className="hidden sm:block "/> can
                access shared photo.
              </Heading>
            </div>
          </>
        )}
      </div>
      {status ? (
        <div className="flex mt-4">
          <Input
            className="w-full items-center select-none text-gray-600"
            value={`${window.location.origin}/preview/${
              selected.publicId ? selected.publicId : undefined
            }`}
            readOnly
          />
          <button
            className="relative inline-flex justify-center items-center w-12 border-gray-300/40 dark:text-white p-2 ml-2 border-2 rounded hover:border-gray-500 dark:hover:border-white transition-colors"
            onClick={() => copyText()}
          >
            <AnimatePresence initial={false}>
              {copied && (
                <motion.div {...copyAnimation} className="absolute">
                  <Check />
                </motion.div>
              )}
            </AnimatePresence>
            <AnimatePresence
              initial={false}
              onExitComplete={() => setTimeout(() => setCopied(false), 1500)}
            >
              {!copied && (
                <motion.div {...copyAnimation} className="absolute">
                  <Clipboard />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default ShareDialog;

const copyAnimation: Variants = {
  initial: {
    opacity: 0,
    scale: 0,
  },
  animate: {
    opacity: 1,
    scale: 1,
  },
  exit: {
    opacity: 0,
    scale: 0,
  },
};
