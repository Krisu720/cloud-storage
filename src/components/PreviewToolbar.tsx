import { FC, ReactNode, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Copy,
  Download,
  Loader2,
  Share2,
  Trash2,
} from "lucide-react";
import ShareDialog from "./dialogs/ShareDialog";
import { useRouter } from "next/navigation";
import { useSelected } from "~/hooks/selectedStore";
import { toast } from "sonner";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { api } from "~/trpc/react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { useSession } from "~/hooks/useSession";

const PreviewToolbar: FC = ({}) => {
  const photo = api.photos.deletePhoto.useMutation();

  const { selected, setSelected } = useSelected();
  const router = useRouter();
  const [downloadLoader, setDownloadLoader] = useState<boolean>(false);

  const {user} = useSession();

  const handleCopy = () => {
    if (selected) navigator.clipboard.writeText(selected.url);
    toast("Copied url to clipboard.");
  };

  const handleDelete = async (uuid: string) => {
    if (user) {
      await photo.mutateAsync(uuid, {
        onError: (err) => toast.error(err.message),
        onSuccess: () => {
          toast("Image has been deleted.");
          router.refresh();
          setSelected(null);
        },
      });
    }
  };

  const handleDownload = (url: string) => {
    setDownloadLoader(true);
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const temporary = document.createElement("a");
        if (selected) temporary.setAttribute("download", selected.uuid);
        const href = URL.createObjectURL(blob);
        temporary.setAttribute("href", href);
        temporary.setAttribute("target", "_blank");
        temporary.click();
        URL.revokeObjectURL(href);
        setDownloadLoader(false);
      });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -150 }}
      animate={{ opacity: 1, y: 0, transition: { type: "tween" } }}
      exit={{ opacity: 0, y: -150 }}
      className="fixed top-5 left-5 right-5 sm:top-10  sm:left-10  sm:right-10 z-30 gap-1 flex justify-between p-1 rounded-full "
    >
      <div className="bg-black/50 rounded-full">
        <ToolbarButton onClick={() => setSelected(null)}>
          <ArrowLeft className="text-white" />
        </ToolbarButton>
      </div>
      <div className="flex gap-2 rounded-full bg-black/50">
        <ToolbarButton
          tooltipTitle="Copy image source link"
          onClick={() => handleCopy()}
        >
          <Copy className="text-white " />
        </ToolbarButton>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <ToolbarButton tooltipTitle="Delete">
              {photo.isLoading ? (
                <Loader2 className="text-white animate-spin" />
              ) : (
                <Trash2 className="text-white" />
              )}
            </ToolbarButton>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              Are you sure you want to delete this image?
            </AlertDialogHeader>
            <AlertDialogDescription>
              This action cannot be restored.
            </AlertDialogDescription>
            <AlertDialogAction
              onClick={selected ? () => handleDelete(selected.uuid) : undefined}
            >
              Delete
            </AlertDialogAction>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
          </AlertDialogContent>
        </AlertDialog>
        <ToolbarButton
          tooltipTitle="Download"
          onClick={selected ? () => handleDownload(selected.url) : undefined}
        >
          {downloadLoader ? (
            <Loader2 className="text-white animate-spin" />
          ) : (
            <Download className="text-white" />
          )}
        </ToolbarButton>

        <Dialog>
          <DialogTrigger asChild>
            <ToolbarButton
              tooltipTitle="Share"
              className="relative inline-flex items-center justify-center z-10"
            >
              {selected?.publicId && (
                <div className="h-10 w-10 bg-green-700/70 rounded-full  animate-pulse absolute -z-10" />
              )}
              <Share2 className="text-white" />
            </ToolbarButton>
          </DialogTrigger>
          <DialogContent>
            <ShareDialog />
          </DialogContent>
        </Dialog>
      </div>
    </motion.div>
  );
};

const ToolbarButton = ({
  children,
  tooltipTitle,
  onClick,
  className,
}: {
  children: ReactNode;
  tooltipTitle?: string;
  onClick?: () => void;
  className?: string;
}) => {
  if (tooltipTitle) {
    return (
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={onClick}
              className={`hover:bg-black/20 dark:hover:bg-white/20 p-4 rounded-full transition-colors ${className}`}
            >
              {children}
            </button>
          </TooltipTrigger>
          <TooltipContent side="bottom">{tooltipTitle}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  } else {
    return (
      <button
        onClick={onClick}
        className="hover:bg-black/20 dark:hover:bg-white/20 p-4 rounded-full transition-colors"
      >
        {children}
      </button>
    );
  }
};

export default PreviewToolbar;
