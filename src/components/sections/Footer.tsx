import Link from "next/link";
import { Cloud } from "lucide-react";

const Footer = ({}) => {
  return (
    <div className="bg-secondary flex flex-col md:flex-row items-center justify-between px-12 gap-4 py-4 md:gap-12 dark:text-white mt-4">
      <Link className="flex items-center" href="/">
        <h1>
          cloud<span className="text-primary">storage</span>
        </h1>
        <Cloud className="text-primary h-8 w-8" />
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
