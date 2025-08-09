import { type ReactNode } from "react";

type props = {
  children: ReactNode;
  className?: string;
};

const SubSubText = ({ children, className = "" }: props) => (
  <span className={`text-[0.9em] text-gray-500 ml-2 ${className}`}>
    {children}
  </span>
);

export { SubSubText };
