import Link from "next/link";
import { FC } from "react";

const Banner = ({}) => {
  return (
    <div className="grid  overflow-y-auto   md:grid-cols-3 gap-6 grid-rows-1 grid-flow-row">
      <div className="border rounded-xl py-8 px-6">
        <h1 className="text-xl font-semibold dark:text-white">Usage</h1>
        <p className="text-gray-500">Total</p>
        <h1 className="text-2xl font-bold mt-3 dark:text-white">132.53MB <span className="text-gray-500 text-base">/ 500.00MB (23.2%)</span></h1>
      </div>
      <div className="border rounded-xl py-8 px-6">
        <h1 className="text-xl font-semibold dark:text-white">Total Photos</h1>
        <p className="text-gray-500">All time</p>
        <h1 className="text-2xl font-bold mt-3 dark:text-white">12</h1>
      </div>
      <div className="border rounded-xl py-8 px-6">
        <h1 className="text-xl font-semibold dark:text-white">Current Plan</h1>
        <p className="text-gray-500">Manage and view your current plan</p>
        <h1 className="text-2xl font-bold mt-3 dark:text-white">Free (500MB) <Link href="/pricing" className="text-sky-500 text-base font-normal hover:underline">change</Link></h1>
      </div>
    </div>
  );
};

export default Banner;
