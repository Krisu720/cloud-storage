import { FC, ReactNode } from "react";

const ErrorSpan = ({ children }: { children: ReactNode }) => {
  return (
    <span className="my-1 dark:text-red-500 text-red-500 text-sm">
      {children}
    </span>
  );
};

export default ErrorSpan;
