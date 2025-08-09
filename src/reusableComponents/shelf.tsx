import type { ReactNode } from "react";

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

const borderColor = "#292929";

const ShelfRow = ({ label, children }: ShelfRowProps) => (
  <tr
    style={{
      marginBottom: "0",
      borderBottomColor: borderColor,
    }}
    className="mb-2 border-b"
  >
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
