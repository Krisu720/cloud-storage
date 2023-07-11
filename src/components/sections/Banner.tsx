import Link from "next/link";
import { FC } from "react";
import Heading from "../ui/Heading";

const Banner = ({}) => {
  return (
    <div className="grid  overflow-y-auto   md:grid-cols-3 gap-6 grid-rows-1 grid-flow-row">
      <div className="border rounded-xl py-8 px-6">
        <Heading size="xl" weight="semibold">Usage</Heading>
        <Heading variant="secondary">Total</Heading>
        <Heading size="xl" weight="bold" className="mt-3">132.53MB <span className="text-gray-500 text-base">/ 500.00MB (23.2%)</span></Heading>
      </div>
      <div className="border rounded-xl py-8 px-6">
        <Heading size="xl" weight="semibold">Total Photos</Heading>
        <Heading variant="secondary">All time</Heading>
        <Heading size="xl" weight="bold" className="mt-3">12</Heading>
      </div>
      <div className="border rounded-xl py-8 px-6">
        <Heading size="xl" weight="semibold">Current Plan</Heading>
        <Heading variant="secondary">Manage and view your current plan</Heading>
        <Heading size="xl" weight="bold" className="mt-3">Free (500MB) <Link href="/pricing" className="text-sky-500 text-base font-normal hover:underline">change</Link></Heading>
      </div>
    </div>
  );
};

export default Banner;
