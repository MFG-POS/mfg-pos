import { ChartType } from 'model/enums/chart-type';
import { IconType } from 'react-icons/lib';
import { ChartPeriod } from 'model/enums/chart-period';

export type SalesChartData = {
  viewDate: string;
  transactionsCount: number;
  clientsCount: number;
  averageBill: number;
  revenue: number;
  profit: number;
};

export type ChartSeries = { name: string; data: number[] };

export type PeriodElement = {
  period: ChartPeriod;
  tooltip: string;
  icon: IconType;
};

export type TypeElement = {
  type: ChartType;
  icon: IconType;
};
