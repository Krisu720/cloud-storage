import { Button } from "@/components/ui/Button";
import Heading from "@/components/ui/Heading";
import { Cloud } from "lucide-react";
import Image from "next/image";
import Link from "next/link";


export default function Home() {
  return (
    <div className="flex items-center justify-center ">
      <div className=" md:mt-28 relative max-w-6xl w-full h-[35rem] flex flex-col items-center justify-center overflow-hidden ">
        <Image
          src="/Sprinkle.svg"
          fill
          alt="sprinkles"
          className="object-cover opacity-25 z-0 select-none"
        />
        <div className="absolute h-[25rem] w-[25rem] rounded-full gradient opacity-25 select-none top-12 right-24" />
        <div className="absolute h-[25rem] w-[25rem] rounded-full gradient opacity-25 select-none top-24 left-24" />
        <div className="absolute h-[25rem] w-[25rem] rounded-full gradient opacity-25 select-none bottom-12 right-80" />
        <div className="relative z-10 max-w-md w-full flex flex-col items-center">
          <div className="flex gap-1 items-center my-4">
            <Heading size="title" weight="semibold" className="md:text-6xl text-4xl">
              cloud<span className="text-sky-500">storage</span>
            </Heading>
            <Cloud className="text-sky-500 h-16 w-16" />
          </div>
          <Heading
            variant="secondary"
            size="lg"
            weight="semibold"
            className="text-center"
          >
            Transfer your photo's from any device easily and keep important
            images in your cloud.
          </Heading>
          <div className="w-full flex justify-center mt-6">
            <Link href="/register">
              <Button variant="sky">Get started</Button>
            </Link>
          </div>
          <Heading variant="secondary" className="mt-6">Have an account? <Link href='/login' className="text-sky-500 hover:underline">Log in!</Link></Heading>
        </div>
      </div>
    </div>
  );
}
