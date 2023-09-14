import { ChartPerDay } from '../types/chart';

const getTotalAreas = (chartData: ChartPerDay): [string, string[]] => {
  const day = Object.keys(chartData);
  const totalAreas = chartData[day[day.length - 1]].map(data => data.id);
  const result: string[] = [];

  for (const area of totalAreas) {
    if (result.includes(area)) break;
    result.push(area);
  }

  return [day[day.length - 1], result];
};

export default getTotalAreas;
