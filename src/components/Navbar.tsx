import { Cloud } from "lucide-react";
import { FC } from "react";
import ModeSwitch from "./ModeSwitch";

const Navbar = ({}) => {
 
  return (
    <div className="container mx-auto py-6 flex justify-between px-6 md:px-0">
      <div className="flex items-center">
        <h1 className="font-semibold text-4xl dark:text-white">
          cloud<span className="text-sky-500">storage</span>
        </h1>
        <Cloud className="text-sky-500 h-12 w-12" />
        <div className="ml-6">

        <ModeSwitch />
        </div>
      </div>
      <div className="h-12 w-12 rounded-full bg-gray-500" />
    </div>
  );
};

export default Navbar;
