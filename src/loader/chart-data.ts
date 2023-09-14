import { httpClient, initAxiosIntance } from '../apis';
import { ChartPerDay, InitChartData } from '../types/chart';

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
