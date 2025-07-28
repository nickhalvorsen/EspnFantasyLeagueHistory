import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { ReactNode } from "react";

type ShelfProps = {
  title: string;
  description?: string;
  children?: ReactNode;
};

const Shelf = ({ title, description, children }: ShelfProps) => (
  <Card>
    <CardHeader>
      <CardTitle>
        <h2>{title}</h2>
      </CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
    <CardContent>
      <table style={{ width: "100%" }}>
        <tbody>{children}</tbody>
      </table>
    </CardContent>
  </Card>
);

type ShelfRowProps = {
  label?: string;
  children?: ReactNode;
};

const ShelfRow = ({ label, children }: ShelfRowProps) => (
  <tr
    style={{
      marginBottom: "0",
      borderBottomColor: "#292929",
    }}
    className="mb-2 border-b"
  >
    {label && (
      <td
        style={{
          minWidth: 70,
          paddingRight: 12,
          whiteSpace: "nowrap",
          lineHeight: "1.7em",
        }}
      >
        {label}
      </td>
    )}
    <td
      style={{
        fontFamily: "Geist",
        width: "100%",
      }}
    >
      {children}
    </td>
  </tr>
);

export { Shelf, ShelfRow };
