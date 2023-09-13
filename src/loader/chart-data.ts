import initAxiosIntance from '../apis/axios-instance';
import httpClient from '../apis/httpClient';
import { ChartPerDay, InitChartData } from '../types/chart';

// interface

// loader function : exec before component rendering

// input : None

// output
// 1. chart data for rendering chart

const instance = initAxiosIntance('/data');
const http = new httpClient(instance);

const chartDataLoader = async () => {
  const chartData = await http.get('/mock-data.json');
  const { response } = chartData;

  const init: ChartPerDay = {};
  const chartDataPerDay: ChartPerDay = Object.entries(response as InitChartData).reduce(
    (prev, curr) => {
      const [key, value] = curr;
      const [date, time] = key.split(' ');

      prev[date] = prev[date] || [];
      prev[date].push({ time, ...value });
      return prev;
    },
    init,
  );

  return chartDataPerDay;
};

export default chartDataLoader;
