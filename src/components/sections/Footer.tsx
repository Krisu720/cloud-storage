import Heading from "../ui/Heading";
import Link from "next/link";
import { Cloud } from "lucide-react";

const Footer = ({}) => {
  return (
    <div className="dark:bg-neutral-800 bg-gray-100 flex items-center justify-between px-12 gap-4 py-4 md:gap-12 dark:text-white flex-col md:flex-row">
      <Link className="flex items-center" href="/">
        <Heading size="xl" weight="semibold">
          cloud<span className="text-sky-500">storage</span>
        </Heading>
        <Cloud className="text-sky-500 h-8 w-8" />
      </Link>
      <div className="flex gap-4">
        <a
          className="hover:underline"
          href="https://github.com/Krisu720"
          target="_blank"
        >
          Author
        </a>
        <a
          className="hover:underline"
          href="https://github.com/Krisu720/cloud-storage"
          target="_blank"
        >
          Github repo
        </a>
      </div>
    </div>
  );
};

export default Footer;
