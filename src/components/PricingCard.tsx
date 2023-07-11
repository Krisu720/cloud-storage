"use client";

import { BadgeCheck, BadgeX } from "lucide-react";
import { FC } from "react";
import { Variants, motion } from "framer-motion";
import { PricingCardType } from "@/utils/mockData";
import Heading from "./ui/Heading";

interface PricingCardProps extends PricingCardType {
  index: number;
}

const animation = (index: number) => {
  const object: Variants = {
    initial: { opacity: 0, y: 250 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        ease: [0.6, 0.01, 0.05, 0.95],
        duration: 1,
        delay: index * 0.05,
      },
    },
  };
  return object;
};

const PricingCard: FC<PricingCardProps> = ({
  title,
  desc,
  benefits,
  price,
  recommended,
  index,
}) => {
  return (
    <motion.div
      {...animation(index)}
      className={`border  rounded-lg flex flex-col mx-6 lg:mx-0 p-6 relative ${
        recommended ? "border-4 border-sky-500" : "border-gray-500"
      } `}
    >
      {recommended && (
        <p className="bg-sky-500 absolute -right-5 -top-3 rounded-full text-sm text-white font-bold py-1 px-2">
          Recommended
        </p>
      )}
      <Heading
        className={`text-4xl  font-bold ${
          recommended ? "text-sky-500" : "dark:text-white"
        }`}
      >
        {title}
      </Heading>
      <Heading size="lg" variant="secondary">
        {desc}
      </Heading>
      <button className="ring-sky-500 ring rounded h-10 text-sky-500 font-semibold text-lg my-4">
        Free
      </button>
      <div className="flex items-center gap-2">
        <Heading size="xl" weight="bold">
          {price}
        </Heading>
        <Heading weight="bold" variant="secondary">
          / month
        </Heading>
      </div>
      <div className="mt-4 flex flex-col gap-2">
        {benefits.map(({ name, status }) => (
          <div className="flex gap-2">
            <BadgeCheck
              className={`${status ? "text-sky-500" : "text-gray-500"}`}
            />
            <Heading
              variant="secondary"
              weight="semibold"
              className={status ? "" : "line-through"}
            >
              {name}
            </Heading>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default PricingCard;
