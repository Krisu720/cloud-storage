import { FC, ReactNode, useState } from "react";
import {  motion } from "framer-motion";
import {
  ArrowLeft,
  Download,
  Loader2,
  Share2,
  Trash2,
} from "lucide-react";
import { Photos } from "@prisma/client";
import Tooltip from "./Tooltip";
import {
  deletePhoto,
} from "@/utils/apiCalls";
interface PreviewToolbarProps {
  selected: Photos;
  setSelected: React.Dispatch<React.SetStateAction<Photos | null>>;
  mutate: () => void;
}

const PreviewToolbar: FC<PreviewToolbarProps> = ({
  selected,
  setSelected,
  mutate,
}) => {
  const [deleteLoader, setDeleteLoader] = useState<boolean>(false);
  const [downloadLoader, setDownloadLoader] = useState<boolean>(false);

  const handleDelete = async (uuid: string) => {
    setDeleteLoader(true);
    const res = await deletePhoto(uuid);
    setDeleteLoader(false);
    mutate();
    setSelected(null);
  };

  const handleDownload = (url: string) => {
    setDownloadLoader(true)
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
        setDownloadLoader(false)
      }).catch(()=>{
        setDeleteLoader(false)
      })
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -150 }}
      animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }}
      exit={{ opacity: 0, y: -150 }}
      className="fixed top-10 left-10 right-10 z-20 flex justify-between bg-gray-500/60 p-1 rounded-full"
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
        <ToolbarButton tooltipTitle="Share">
          <Share2 className="text-white" />
        </ToolbarButton>
      </div>
    </motion.div>
  );
};

const ToolbarButton = ({
  children,
  tooltipTitle,
  onClick,
}: {
  children: ReactNode;
  tooltipTitle?: string;
  onClick?: () => void;
}) => {
  if (tooltipTitle) {
    return (
      <Tooltip title={tooltipTitle}>
        <button
          onClick={onClick}
          className="hover:bg-black/20 dark:hover:bg-white/20 p-4 rounded-full transition-colors"
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
