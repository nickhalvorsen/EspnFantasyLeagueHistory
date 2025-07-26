"use client";

import { TerminalIcon, TrendingUp } from "lucide-react";
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

export const description = "A horizontal bar chart";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

const renderCustomBarLabel = ({ payload, x, y, width, height, value }) => {
  console.log([payload], "payload");
  return (
    <text
      x={x}
      y={y}
      fill="#666"
      textAnchor="start"
    >{`value: ${value} ${payload}`}</text>
  );
};

const AveragePointsChart = () => {
  const allData = useStore();
  let data = allData.teams.map((team) => ({
    manager: team.managerName,
    teamEspnId: team.espnId,
    averagePoints: 0,
  }));

  for (const team of allData.teams) {
    const teamWeeks = allData.teamWeeks.filter(
      (week) =>
        week.awayTeamEspnId === team.espnId ||
        week.homeTeamEspnId === team.espnId
    );
    const totalPoints = teamWeeks.reduce((acc, week) => {
      return (
        acc +
        (week.awayTeamEspnId === team.espnId
          ? week.awayTeamScore
          : week.homeTeamScore)
      );
    }, 0);
    const averagePoints = totalPoints / teamWeeks.length;

    data.find((t) => t.teamEspnId === team.espnId).averagePoints =
      averagePoints.toFixed(2);
  }

  data = data.sort((a, b) => b.averagePoints - a.averagePoints);

  return (
    <Card className="flex-grow basis-full md:basis-1/2">
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
            //barCategoryGap={}
          >
            <XAxis type="number" dataKey="averagePoints" domain={[100, 150]} />
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
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey="averagePoints"
              fill="var(--color-desktop)"
              radius={5}
              label={renderCustomBarLabel}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export { AveragePointsChart };

const data = [
  { name: "bing", value: 0.16666666666666666 },
  { name: "facebook words", value: 0.04411764705882353 },
  { name: "adwords", value: 0.0297029702970297 },
];

const CustomizedLabel = (props) => {
  const { x, y, fill, value } = props;
  return (
    <text
      x={x}
      y={y}
      fontSize="16"
      fontFamily="sans-serif"
      fill={fill}
      textAnchor="start"
    >
      {value}%
    </text>
  );
};

const SimpleBarChart = () => (
  <div className="container">
    <BarChart
      accessibilityLayer
      data={data}
      layout="vertical"
      barCategoryGap={1}
      margin={{ top: 0, right: 50, left: 0, bottom: 0 }}
    >
      <XAxis type="number" hide />
      <YAxis
        type="category"
        width={150}
        padding={{ left: 20 }}
        dataKey="name"
      />

      <Bar dataKey="value" fill="#323232" label={<CustomizedLabel />} />
    </BarChart>
  </div>
);
export { SimpleBarChart };
