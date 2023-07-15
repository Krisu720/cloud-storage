import { FC, HTMLAttributes } from "react";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

const Container: FC<ContainerProps> = ({ children, className, ...props }) => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className={`md:mx-6 mx-3 ${className}`} {...props}>
        {children}
      </div>
    </div>
  );
};

export default Container;
