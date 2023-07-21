import { FC, ReactNode, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Download, Loader2, Share2, Trash2 } from "lucide-react";
import { Photos } from "@prisma/client";
import Tooltip from "./ui/Tooltip";
import { deletePhoto } from "@/lib/apiCalls";
import Dialog from "./ui/Dialog";
import ShareDialog from "./dialogs/ShareDialog";
import { useSession } from "next-auth/react";
import {useRouter} from 'next/navigation'
import { useToast } from "@/hooks/toastStore";
interface PreviewToolbarProps {
  selected: Photos;
  setSelected: React.Dispatch<React.SetStateAction<Photos | null>>;
}

const PreviewToolbar: FC<PreviewToolbarProps> = ({
  selected,
  setSelected,
}) => {
  const router = useRouter()
  const [deleteLoader, setDeleteLoader] = useState<boolean>(false);
  const [downloadLoader, setDownloadLoader] = useState<boolean>(false);

  const { data } = useSession();
  const {toast} = useToast()

  const handleDelete = async (uuid: string) => {
    if (data?.user) {
      setDeleteLoader(true);
      const res = await deletePhoto(data.user.userId, uuid);
      setDeleteLoader(false);
      toast({title: "Image has been deleted."})
      router.refresh();
      setSelected(null);
    }
  };

  const handleDownload = (url: string) => {
    setDownloadLoader(true);
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const temporary = document.createElement("a");
        temporary.setAttribute("download", selected.uuid);
        const href = URL.createObjectURL(blob);
        temporary.setAttribute("href", href);
        temporary.setAttribute("target", "_blank");
        temporary.click();
        URL.revokeObjectURL(href);
        setDownloadLoader(false);
      })
      .catch(() => {
        setDeleteLoader(false);
      });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -150 }}
      animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }}
      exit={{ opacity: 0, y: -150 }}
      className="fixed top-10 left-10 right-10 z-30 flex justify-between bg-gray-500/60 p-1 rounded-full"
    >
      <ToolbarButton onClick={() => setSelected(null)}>
        <ArrowLeft className="text-white" />
      </ToolbarButton>
      <div className="flex gap-2">
        <ToolbarButton
          tooltipTitle="Delete"
          onClick={() => handleDelete(selected.uuid)}
        >
          {deleteLoader ? (
            <Loader2 className="text-white animate-spin" />
          ) : (
            <Trash2 className="text-white" />
          )}
        </ToolbarButton>

        <ToolbarButton
          tooltipTitle="Download"
          onClick={() => handleDownload(selected.url)}
        >
          {downloadLoader ? (
            <Loader2 className="text-white animate-spin" />
          ) : (
            <Download className="text-white" />
          )}
        </ToolbarButton>
        <Dialog>
          <Dialog.Button>
            <ToolbarButton
              tooltipTitle="Share"
              className="relative inline-flex items-center justify-center z-10"
            >
              {selected.publicId && (
                <div className="h-10 w-10 bg-green-700/70 rounded-full  animate-pulse absolute -z-10" />
              )}
              <Share2 className="text-white" />
            </ToolbarButton>
          </Dialog.Button>
          <Dialog.Menu>
            <ShareDialog
              selected={selected}
              setSelected={setSelected}
            />
          </Dialog.Menu>
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
      <Tooltip title={tooltipTitle}>
        <button
          onClick={onClick}
          className={`hover:bg-black/20 dark:hover:bg-white/20 p-4 rounded-full transition-colors ${className}`}
        >
          {children}
        </button>
      </Tooltip>
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
