"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

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
import { useStore } from "../useData";
import { useAveragePointsData } from "..//useAveragePointsData";

export const description = "A horizontal bar chart";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

const AveragePointsChart = () => {
  let data = useStore((state) => state.teamStats)
    .map((teamStats) => ({
      manager: teamStats.team.managerName,
      averagePointsPerGame: teamStats.averagePointsPerGame.toFixed(2),
    }))
    .sort((a, b) => b.averagePointsPerGame - a.averagePointsPerGame);

  return (
    <Card className="w-full md:w-1/2">
      <CardHeader>
        <CardTitle>
          <h2>Average points per game</h2>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={data}
            layout="vertical"
            margin={{
              left: -20,
            }}
          >
            <XAxis
              type="number"
              dataKey="averagePointsPerGame"
              domain={[100, 150]}
            />
            <YAxis
              dataKey="manager"
              width={100}
              type="category"
              tickLine={false}
              tickMargin={0}
              axisLine={false}
              tick={{
                fontSize: 16,
                fontFamily: "Geist",
              }}
              // Don't collapse manager names on small chart sizes
              interval={0}
            />
            <Bar
              dataKey="averagePointsPerGame"
              fill="var(--chart-1)"
              radius={5}
              label={{
                position: "right",
                fill: "#777",
                fontSize: 14,
                fontFamily: "Geist",
              }}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export { AveragePointsChart };
