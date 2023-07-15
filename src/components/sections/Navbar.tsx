import { Cloud, LogIn } from "lucide-react";
import ModeSwitch from "../ModeSwitch";
import Link from "next/link";
import UploadButton from "../dialogs/UploadButton";
import AvatarDropdown from "../AvatarDropdown";
import Heading from "../ui/Heading";
import { getServerSession } from "next-auth";
import authConfig from "@/lib/authConfig";
const Navbar = async ({}) => {
  const session = await getServerSession(authConfig);

  return (
    <>
      <div className="py-6 flex justify-between ">
        <div className="flex items-center">
          <Link className="flex items-center" href="/">
            <Heading size="xl" weight="semibold" className="md:text-4xl">
              cloud<span className="text-sky-500">storage</span>
            </Heading>
            <Cloud className="text-sky-500 h-8 w-8 md:h-12 md:w-12" />
          </Link>
        </div>
        <div className="flex items-center gap-2 md:gap-5">
          {session && <UploadButton />}
          <ModeSwitch />
          {session?.user ? (
            <AvatarDropdown
              session={session}
            />
          ) : (
            <Link
              href="/login"
              className="transition-colors hover:bg-black/20 rounded-full p-2 dark:text-white focus:outline outline-gray-100"
            >
              <LogIn />
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
