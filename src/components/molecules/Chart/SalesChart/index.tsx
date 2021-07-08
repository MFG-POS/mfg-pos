import { ApexOptions } from 'apexcharts';
import Chart from 'react-apexcharts';
import { ChartSeries } from 'model/chart/chart-types';

type SalesChartProps = {
  options: ApexOptions;
  series: ChartSeries[];
};

const SalesChart = ({ options, series }: SalesChartProps) => (
  <Chart
    options={options}
    series={series}
    type={options.chart?.type}
    width={options.chart?.width}
    height={options.chart?.height}
  />
);

export default SalesChart;
