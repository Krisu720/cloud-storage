import { FC } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Download,
  Share2,
  Trash2,
} from "lucide-react";
import { Photos } from "@prisma/client";
import Tooltip from "./Tooltip";

interface PreviewToolbarProps {
  selected: Photos;
  setSelected: React.Dispatch<React.SetStateAction<Photos | null>>;
}

const PreviewToolbar: FC<PreviewToolbarProps> = ({ selected, setSelected }) => {
  const handleDownload = async () => {};

  return (
    <motion.div
      initial={{ opacity: 0, y: -150 }}
      animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }}
      exit={{ opacity: 0, y: -150 }}
      className="fixed top-10 left-10 right-10 z-20 flex justify-between bg-gray-500/60 p-1 rounded-full"
    >
        <button
          onClick={() => setSelected(null)}
          className="hover:bg-black/20 dark:hover:bg-white/20 p-4 rounded-full transition-colors"
        >
          <ArrowLeft className="text-white" />
        </button>
      <div className="flex gap-2">
        <Tooltip title="Delete">
          <button
            onClick={() => setSelected(null)}
            className="hover:bg-black/20 dark:hover:bg-white/20 p-4 rounded-full transition-colors"
          >
            <Trash2 className="text-white" />
          </button>
        </Tooltip>
        <Tooltip title="Download">
          <button
            onClick={() => handleDownload()}
            className="hover:bg-black/20 dark:hover:bg-white/20 p-4 rounded-full transition-colors"
          >
            <Download className="text-white" />
          </button>
        </Tooltip>
        <Tooltip title="Share">
          <button
            onClick={() => setSelected(null)}
            className="hover:bg-black/20 dark:hover:bg-white/20 p-4 rounded-full transition-colors"
          >
            <Share2 className="text-white" />
          </button>
        </Tooltip>
      </div>
    </motion.div>
  );
};

export default PreviewToolbar;
