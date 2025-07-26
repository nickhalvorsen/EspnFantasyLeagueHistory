import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { ReactNode } from "react";

type ShelfProps = {
  title: string;
  children?: ReactNode;
};

const Shelf = ({ title, children }: ShelfProps) => (
  <Card className="w-full md:w-1/2">
    <CardHeader>
      <h2>{title}</h2>
    </CardHeader>
    <CardContent>{children}</CardContent>
  </Card>
);

type ShelfRowProps = {
  label?: string;
  children?: ReactNode;
};

const ShelfRow = ({ label, children }: ShelfRowProps) => (
  <div
    style={{ marginBottom: "0", borderBottomColor: "#222" }}
    className="mb-2 border-b"
  >
    {label && (
      <span style={{ minWidth: 68, display: "inline-block" }}>{label}</span>
    )}
    <span
      style={
        {
          /*lineHeight: "1.8em"*/
        }
      }
    >
      {children}
    </span>
  </div>
);

export { Shelf, ShelfRow };
