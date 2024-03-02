"use client";

import { FC, useEffect, useState } from "react";
import { Input } from "../ui/input";
import {
  AlertTriangle,
  BadgeAlert,
  Check,
  Clipboard,
  Loader2,
  X,
} from "lucide-react";
import { Button } from "../ui/button";
import { AnimatePresence, Variants, motion } from "framer-motion";

import { useRouter } from "next/navigation";
import { useSelected } from "~/hooks/selectedStore";
import { toast } from "sonner";
import { DialogDescription, DialogHeader } from "../ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { api } from "~/trpc/react";
import { useSession } from "~/hooks/useSession";

const ShareDialog: FC = ({}) => {
  const publicPhoto = api.photos.setPublicPhoto.useMutation();
  const privatePhoto = api.photos.removePublicPhoto.useMutation();

  const { selected, setSelected } = useSelected();
  const router = useRouter();
  const {user} = useSession();
  const [status, setStatus] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  const loading =
    publicPhoto.isLoading || privatePhoto.isLoading ? true : false;

  const copyText = () => {
    if (selected?.publicId) {
      navigator.clipboard.writeText(
        `${window.location.origin}/preview/${selected.publicId}`
      );
      setCopied(true);
    }
    toast("Copied to clipboard.");
  };

  const setPublic = async () => {
    try {
      if (user?.id && selected) {
        await publicPhoto.mutateAsync(selected.uuid, {
          onError: (err) => toast.error(err.message),
          onSuccess: (res) => {
            setSelected(res);
            router.refresh();
            toast("This photo is public now.");
          },
        });
      }
    } catch (error) {}
  };

  const removePublic = async () => {
    if (user?.id && selected) {
      await privatePhoto.mutateAsync(selected.uuid, {
        onError: (err) => toast.error(err.message),
        onSuccess: (res) => {
          setSelected(res);
          router.refresh();
          toast("This photo is not public anymore.");
        },
      });
    }
  };

  useEffect(() => {
    setStatus(selected?.publicId ?? null);
  }, [selected]);

  return (
    <>
      <DialogHeader>Share</DialogHeader>
      <DialogDescription>
        Share your photo to someone using external link.
      </DialogDescription>

      <Alert variant={status ? "default" : "destructive"}>
        <AlertTitle className="flex gap-0.5 items-center">
          <BadgeAlert className="h-5 w-5 flex-shrink-0" />
          Privacy Alert
        </AlertTitle>
        {status ? (
          <AlertDescription>
            Everyone who have the link can access this photo.
          </AlertDescription>
        ) : (
          <AlertDescription>
            If you share photo everyone who has unique link can access shared
            photo.
          </AlertDescription>
        )}
      </Alert>
      {status ? (
        <>
          <Button
            size="sm"
            variant="destructive"
            onClick={() => removePublic()}
            className="flex items-center gap-2"
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            Stop sharing photo
          </Button>
          <div className="flex mt-4">
            <Input
              className="w-full items-center select-none text-gray-600"
              value={`${window.location.origin}/preview/${
                selected?.publicId ?? undefined
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
        </>
      ) : (
        <Button
          size="sm"
          variant="default"
          onClick={() => setPublic()}
          className="flex items-center gap-2"
        >
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          Share photo
        </Button>
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
