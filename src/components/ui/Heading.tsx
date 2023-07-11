import { cn } from "@/utils/stylingHelper";
import { VariantProps, cva } from "class-variance-authority";
import { FC } from "react";

interface HeadingProps extends VariantProps<typeof headingVariants> {
  children: React.ReactNode;
  className?: string;
}

const headingVariants = cva("dark:text-white text-black", {
  variants: {
    size: {
      default: "text-base",
      lg: "text-lg",
      xl: "text-3xl",
      title: "text-5xl tracking-tighter"
    },
    weight: {
      default: "",
      semibold: "font-semibold",
      bold: "font-bold",
      extrabold: "font-extrabold"
    },
    variant: {
      default: "",
      secondary: "text-gray-500 dark:text-gray-400"

    },
  },
  defaultVariants: {
    size: "default",
    variant: "default",
    weight: "default"
  },
});

const Heading: FC<HeadingProps> = ({ children, variant, size,weight, className }) => {
  return (
    <h1 className={cn(headingVariants({ variant, size, weight,className }))}>
      {children}
    </h1>
  );
};

export default Heading;
