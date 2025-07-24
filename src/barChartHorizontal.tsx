"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A horizontal bar chart";

const chartData = [
  { manager: "Alex", differential: -32, label: "14-46" },
  { manager: "Brandon", differential: -16, label: "22-38" },
  { manager: "Connor", differential: -50, label: "5-55" },
  { manager: "Cole", differential: 0, label: "30-30" },
  { manager: "G-Pop", differential: 34, label: "47-13" },
  { manager: "Leah", differential: -4, label: "28-32" },
  { manager: "Nick", differential: -40, label: "10-50" },
  { manager: "Paul", differential: 20, label: "40-20" },
  { manager: "Sean", differential: -54, label: "3-57" },
  { manager: "Trace", differential: 10, label: "35-25" },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

const renderCustomBarLabel = ({ payload, x, y, width, height, value }) => {
  return (
    <text
      x={x}
      y={y}
      fill="#666"
      textAnchor="inherit"
      dy={0}
    >{`value: ${value}`}</text>
  );
};

export function ChartBarHorizontalTest() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Bar Chart - Horizontal</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: -20,
            }}
          >
            <XAxis type="number" dataKey="differential" hide />
            <YAxis
              dataKey="manager"
              width={80}
              type="category"
              tickLine={false}
              tickMargin={0}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey="differential"
              fill="var(--color-desktop)"
              radius={3}
              label={renderCustomBarLabel}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
