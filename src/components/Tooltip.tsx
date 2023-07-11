import { FC } from "react";
import * as Too from "@radix-ui/react-tooltip";
import Heading from "./ui/Heading";

interface TooltipProps {
    children: React.ReactNode
    title: string
}

const Tooltip: FC<TooltipProps> = ({children,title}) => {
  return (
    <Too.Provider>
      <Too.Root delayDuration={0}>
        <Too.Trigger asChild>
         {children}
        </Too.Trigger>
        <Too.Portal>
          <Too.Content
            sideOffset={10}
            className="relative bg-gray-600 text-white z-30 px-2 py-2 rounded-xl "
          >
            <Heading className="text-white">{title}</Heading>
          </Too.Content>
        </Too.Portal>
      </Too.Root>
    </Too.Provider>
  );
};

export default Tooltip;
