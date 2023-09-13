export interface InitChartData {
  [key: string]: {
    id: string;
    value_area: number;
    value_bar: number;
  };
}

export interface ModifiedChartData {
  id: string;
  time: string;
  value_area: number;
  value_bar: number;
}

export interface ChartPerDay {
  [key: string]: ModifiedChartData[];
}
