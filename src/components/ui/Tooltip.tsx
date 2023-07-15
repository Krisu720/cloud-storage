import { FC } from "react";
import * as RadixTooltip from "@radix-ui/react-tooltip";
import Heading from "./Heading";

interface TooltipProps {
  children: React.ReactNode;
  title: string;
}

const Tooltip: FC<TooltipProps> = ({ children, title }) => {
  return (
    <RadixTooltip.Provider>
      <RadixTooltip.Root delayDuration={0}>
        <RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>
        <RadixTooltip.Portal>
          <RadixTooltip.Content
            sideOffset={10}
            className="relative bg-gray-600 text-white z-30 px-2 py-2 rounded-xl "
          >
            <Heading className="text-white">{title}</Heading>
          </RadixTooltip.Content>
        </RadixTooltip.Portal>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  );
};

export default Tooltip;
