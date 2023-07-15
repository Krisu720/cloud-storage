import * as React from "react";

import { cn } from "@/utils/stylingHelper";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "border-2 border-gray-300/40 p-2 rounded focus:outline-none focus:border-gray-500 transition-colors bg-transparent dark:focus:border-white dark:text-white",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
