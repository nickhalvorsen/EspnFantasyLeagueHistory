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
  <Card className="w-full md:w-1/2">
    <CardHeader>
      <CardTitle>
        <h2>{title}</h2>
      </CardTitle>
      {description && <CardDescription>{description}</CardDescription>}
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
    style={{ marginBottom: "0", borderBottomColor: "#292929" }}
    className="mb-2 border-b"
  >
    {label && (
      <span style={{ minWidth: 70, display: "inline-block", paddingRight: 8 }}>
        {label}
      </span>
    )}
    <span
      style={{
        fontFamily: "Geist",
        /*lineHeight: "1.8em"*/
      }}
    >
      {children}
    </span>
  </div>
);

export { Shelf, ShelfRow };
