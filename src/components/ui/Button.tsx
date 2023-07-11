import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/utils/stylingHelper";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-all duration-150 font-semibold",
  {
    variants: {
      variant: {
        default: "dark:bg-white bg-black text-white dark:text-black",
        sky: "bg-sky-500 text-white hover:bg-sky-500/50 disabled:bg-sky-900",
        danger: "text-white bg-red-500 hover:bg-red-500/70 disabled:bg-red-950 disabled:text-gray-400 ",
        success: "text-white bg-green-600 hover:bg-green-600/70 "
      },
      size: {
        default: "h-10 py-2 px-4 text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, children, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
