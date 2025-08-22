import type { ReactNode } from "react";
import classes from "./shelf.module.scss";

type ShelfProps = {
  children: ReactNode;
};

const Shelf = ({ children }: ShelfProps) => (
  <table style={{ width: "100%" }}>
    <tbody>{children}</tbody>
  </table>
);

type ShelfRowProps = {
  label?: string | ReactNode;
  children?: ReactNode;
};

const ShelfRow = ({ label, children }: ShelfRowProps) => (
  <tr className={`mb-2  ${classes["shelf-row"]}`}>
    {label && (
      <td
        style={{
          minWidth: 70,
          paddingRight: 6,
          whiteSpace: "nowrap",
          lineHeight: "1.7em",
          //borderRight: `1px solid ${borderColor}`,
        }}
      >
        {label}
      </td>
    )}
    <td
      style={{
        fontFamily: "Geist",
        width: "100%",
        paddingLeft: 6,
      }}
    >
      {children}
    </td>
  </tr>
);

export { Shelf, ShelfRow };
