import { useCallback } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { Payload } from "recharts/types/component/DefaultLegendContent";

interface LineDatum {
  name: string;
  example: number;
}

const labels = Array(12).fill((Math.random() * 10).toLocaleString());

const data: LineDatum[] = Array(12)
  .fill(1)
  .map((_v, i) => {
    return {
      name: labels[i],
      example: Math.random() * 100,
    };
  });

export default function App() {
  const renderLegendText = useCallback((value: string, entry: Payload) => {
    const { color } = entry;
    // Note that this log includes the datakey
    console.log(entry);
    return (
      <span style={{ color }}>
        {entry.legendIcon}
        {/* Note that Typescript throws an error here, remove the @ts-ignore portion to see the error */}
        {/* @ts-ignore disable-next-line */}
        {entry.dataKey}
      </span>
    );
  }, []);

  return (
    <AreaChart width={600} height={400} data={data}>
      <CartesianGrid />
      <XAxis dataKey="example" />
      <YAxis />
      <Legend formatter={renderLegendText} />
      <Tooltip />
      <Area
        type="monotone"
        dataKey="example"
        stroke="darkBlue"
        fill="lightBlue"
        name="Example"
      />
    </AreaChart>
  );
}
