"use client";

import Heading from "../ui/Heading";
import { getPhotosInfo } from "@/lib/apiCalls";
import { Session } from "next-auth";
import useSWR from "swr";

const Banner = ({ session }: { session: Session }) => {
  const userId = session.user.userId;

  const { data } = useSWR<{
    size: number;
    number: number;
    sharedNumber: number;
  }>("/api/photos/info/" + userId, () => getPhotosInfo(userId));

  return (
    <div className="flex snap-x snap-mandatory   overflow-x-auto  gap-2 ">
      <div className="border rounded-xl py-8 px-6 w-11/12 md:w-1/3 snap-center flex-shrink-0 md:flex-shrink">
        <Heading size="xl" weight="semibold">
          Usage
        </Heading>
        <Heading variant="secondary">Total</Heading>
        <Heading size="xl" weight="bold" className="mt-3">
          {data && Math.round(data.size * 100) / 100}MB
        </Heading>
      </div>
      <div className="border rounded-xl py-8 px-6 w-11/12 md:w-1/3 snap-center flex-shrink-0 md:flex-shrink">
        <Heading size="xl" weight="semibold">
          Total Photos
        </Heading>
        <Heading variant="secondary">All time</Heading>
        <Heading size="xl" weight="bold" className="mt-3">
          {data && data.number}
        </Heading>
      </div>
      <div className="border rounded-xl py-8 px-6 w-11/12 md:w-1/3 snap-center flex-shrink-0 md:flex-shrink">
        <Heading size="xl" weight="semibold">
          Shared Photos
        </Heading>
        <Heading variant="secondary">Total</Heading>
        <Heading size="xl" weight="bold" className="mt-3">
          {data && data.sharedNumber}
        </Heading>
      </div>
    </div>
  );
};

export default Banner;
