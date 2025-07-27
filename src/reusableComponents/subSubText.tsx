import { type ReactNode } from "react";

type props = {
  children: ReactNode;
};

const SubSubText = ({ children }: props) => (
  <span className="text-xs text-gray-500 ml-2">{children}</span>
);

export { SubSubText };
