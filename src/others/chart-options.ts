import { ApexOptions } from 'apexcharts';

export const defaultChartOptions = {
  chart: {
    height: 500,
    width: 900,
    type: 'line',
    zoom: {
      enabled: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: 'straight',
  },
  xaxis: {
    categories: [],
  },
  yaxis: {
    labels: {
      formatter: (value: number) => value.toFixed(2),
    },
  },
} as ApexOptions;
