import { ChartContainer, type ChartConfig } from "@/components/ui/chart";
import { Bar, BarChart, XAxis, YAxis } from "recharts";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

type ChartData = {
  label: string;
  value: number;
};

type HorizontalBarChartProps = {
  data: ChartData[];
  domainStart?: number;
  domainEnd?: number | "domainEnd";
};

const HorizontalBarChart = ({
  data,
  domainStart,
  domainEnd,
}: HorizontalBarChartProps) => (
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
        dataKey="value"
        domain={[domainStart ?? 0, domainEnd ?? "domainEnd"]}
      />
      <YAxis
        dataKey="label"
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
        dataKey="value"
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
);

export { HorizontalBarChart };
