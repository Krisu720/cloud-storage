import { FC } from "react";
import UploadDialog from "./sections/UploadDialog";
import Tooltip from "./Tooltip";
import { Upload } from "lucide-react";

const UploadButton = ({}) => {
  return (
    <UploadDialog>
      <button className="transition-colors hover:bg-black/20 rounded-full p-2 dark:text-white focus:outline outline-gray-100">
        <Upload />
      </button>
    </UploadDialog>
  );
};

export default UploadButton;
