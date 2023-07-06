import { Cloud } from "lucide-react";
import ModeSwitch from "../ModeSwitch";
import Link from "next/link";
import UploadButton from "../UploadButton";
import AvatarDropdown from "../AvatarDropdown";

const Navbar = ({}) => {
  return (
    <>
      <div className="py-6 flex justify-between ">
        <div className="flex items-center">
          <Link className="flex items-center" href="/photos">
            <h1 className="font-semibold text-2xl md:text-4xl dark:text-white">
              cloud<span className="text-sky-500">storage</span>
            </h1>
            <Cloud className="text-sky-500 h-8 w-8 md:h-12 md:w-12" />
          </Link>
        </div>
        <div className="flex items-center gap-2 md:gap-5">
          <UploadButton />
          <ModeSwitch />
          <AvatarDropdown>
            <div className="h-12 w-12 rounded-full bg-gray-500 active:outline focus:outline outline-black/20 cursor-pointer" />
          </AvatarDropdown>
        </div>
      </div>
    </>
  );
};

export default Navbar;
