'use client'

import { Cloud, LogIn } from "lucide-react";
import ModeSwitch from "../ModeSwitch";
import Link from "next/link";
import AvatarDropdown from "../AvatarDropdown";
import { validateSession } from "~/server/auth";
import { cn } from "~/lib/utils";
import { buttonVariants } from "../ui/button";
import { useSession } from "~/hooks/useSession";
const Navbar = ({}) => {
  const {user} = useSession()

  return (
    <>
      <div className="py-6 px-2 flex justify-between ">
        <div className="flex items-center">
          <Link className="flex items-center" href="/">
            <h1  className="text-2xl md:text-4xl font-semibold">
              cloud<span className="text-primary">storage</span>
            </h1>
            <Cloud className="text-primary h-8 w-8 md:h-12 md:w-12" />
          </Link>
        </div>
        <div className="flex items-center gap-2 md:gap-5">
          <ModeSwitch />
          {user ? (
            <AvatarDropdown
              user={user}
            />
          ) : (
            <Link
              href="/login"
              className={cn(buttonVariants({size:"icon",variant:"ghost"}))}
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
