import { type ReactNode } from "react";

type props = {
  children: ReactNode;
};

const SubText = ({ children }: props) => (
  <span style={{ marginLeft: 6, fontSize: "0.9em", color: "#888" }}>
    {children}
  </span>
);

export { SubText };
