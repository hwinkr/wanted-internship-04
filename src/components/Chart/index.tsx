import React from 'react';
import { ModifiedChartData } from '../../types/chart';
import {
  Area,
  Bar,
  Cell,
  ComposedChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { CategoricalChartState } from 'recharts/types/chart/generateCategoricalChart';
import ToolTip from '../ToolTip';
import { CHART_DATA_COLOR, CHART_DATA_KEY } from '../../constants';

interface ChartProps {
  chartData: ModifiedChartData[];
  activeAreas: string[];
  handleActiveAreas: (param: string) => void;
}

const Chart = ({ chartData, activeAreas, handleActiveAreas }: ChartProps) => {
  const handleBarClick = (data: CategoricalChartState) => {
    if (!data || !data.activePayload) return;

    const {
      payload: { id },
    } = data.activePayload[0];
    handleActiveAreas(id as string);
  };

  const isActiveArea = (area: string) => activeAreas.includes(area);

  return (
    <ResponsiveContainer width="100%" minHeight={400}>
      <ComposedChart
        onClick={handleBarClick}
        width={2000}
        height={400}
        data={chartData}
        margin={{
          top: 40,
          right: 80,
          left: 80,
          bottom: 20,
        }}
      >
        <Legend verticalAlign="bottom" height={36} />
        <Tooltip position={{ y: -5 }} contentStyle={{ outline: 'none' }} content={ToolTip} />
        <XAxis
          dataKey={CHART_DATA_KEY.TIME}
          label={{ value: `${CHART_DATA_KEY.TIME}`, position: 'left', offset: 6 }}
          scale="auto"
          minTickGap={50}
        />
        <YAxis
          yAxisId={CHART_DATA_KEY.BAR}
          dataKey={CHART_DATA_KEY.BAR}
          orientation="left"
          label={{ value: `${CHART_DATA_KEY.BAR}`, position: 'top', offset: 15 }}
        />
        <YAxis
          dataKey={CHART_DATA_KEY.AREA}
          yAxisId={CHART_DATA_KEY.AREA}
          label={{ value: `${CHART_DATA_KEY.AREA}`, position: 'top', offset: 15 }}
          orientation="right"
        />

        <Bar
          yAxisId={CHART_DATA_KEY.BAR}
          dataKey={CHART_DATA_KEY.BAR}
          fill={CHART_DATA_COLOR.BAR}
          radius={[3, 3, 0, 0]}
          animationEasing={'ease-in-out'}
        >
          {chartData.map((data, index) => {
            return (
              <Cell
                key={`cell-${index}`}
                fill={
                  isActiveArea(data.id) ? `${CHART_DATA_COLOR.AREA}` : `url(#${CHART_DATA_KEY.BAR})`
                }
              />
            );
          })}
        </Bar>
        <Area
          yAxisId={CHART_DATA_KEY.AREA}
          dataKey={CHART_DATA_KEY.AREA}
          type="monotone"
          fill={`url(#${CHART_DATA_KEY.AREA})`}
          stroke={CHART_DATA_COLOR.AREA}
        />

        <defs>
          <linearGradient id={CHART_DATA_KEY.BAR} x1="0" y1="1.5" x2="0" y2="0">
            <stop offset="30%" stopColor={CHART_DATA_COLOR.GRAY} stopOpacity={0.5} />
            <stop offset="100%" stopColor={CHART_DATA_COLOR.BAR} stopOpacity={0.5} />
          </linearGradient>
          <linearGradient id={CHART_DATA_KEY.AREA} x1="0" y1="1.5" x2="0" y2="0">
            <stop offset="30%" stopColor={CHART_DATA_COLOR.GRAY} stopOpacity={0.5} />
            <stop offset="100%" stopColor={CHART_DATA_COLOR.AREA} stopOpacity={0.5} />
          </linearGradient>
        </defs>
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default Chart;
