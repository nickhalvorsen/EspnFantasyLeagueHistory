import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface StatCardProps {
  name: string;
  value: string | number;
}

const StatCard = ({ name, value }: StatCardProps) => (
  <Card className="@container/card">
    <CardHeader>
      <CardTitle>
        <span className="text-sm text-muted-foreground">{name}</span>
      </CardTitle>
      <CardAction />
    </CardHeader>
    <CardContent>
      <span className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
        {value}
      </span>
    </CardContent>
  </Card>
);

export { StatCard };
