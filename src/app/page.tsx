import { Cloud, ImageIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button, buttonVariants } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { validateSession } from "~/server/auth";

export default async function Home() {
  const { user } = await validateSession();

  return (
    <div className="flex items-center justify-center h-[calc(100vh-88px)] relative ">
      <Image
        src="/Sprinkle.svg"
        fill
        alt="sprinkles"
        className="absolute opacity-50 inset-0 object-cover"
      />
      <div className="absolute h-[25rem] w-[25rem] rounded-full gradient opacity-25 select-none top-12 right-24" />
      <div className="absolute h-[25rem] w-[25rem] rounded-full gradient opacity-25 select-none top-24 left-24" />
      <div className="absolute h-[25rem] w-[25rem] rounded-full gradient opacity-25 select-none bottom-12 right-80" />
      <div className="backdrop-blur-sm w-full h-full items-center flex justify-center">

      <div className="relative z-10 max-w-md w-full flex flex-col items-center justify-center px-2 h-full ">
        <div className="flex gap-1 items-center my-4">
          <h1 className="md:text-6xl text-4xl tracking-tighter font-bold">
            cloud<span className="text-primary">storage</span>
          </h1>
          <Cloud className="text-primary h-16 w-16" />
        </div>
        <h1 className="text-center">
          Transfer your photo&apos;s from any device easily and keep important
          images in your cloud.
        </h1>
        {user ? (
          <Link href="/photos"  className={cn(buttonVariants({className:"mt-4"}))}>
            <ImageIcon className="mr-2" /> My gallery
          </Link>
        ) : (
          <>
            <Link href="/register">
              <Button className="mt-6">Get started</Button>
            </Link>
            <h1 className="mt-6 h1">
              Have an account?{" "}
              <Link href="/login" className="text-primary hover:underline">
                Log in!
              </Link>
            </h1>
          </>
        )}
      </div>
      </div>

    </div>
  );
}
