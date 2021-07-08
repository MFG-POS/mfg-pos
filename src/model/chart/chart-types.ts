export type SalesChartData = {
  date: Date;
  viewDate: string;
  transactionsCount: number;
  clientsCount: number;
  averageBill: number;
};

export type ChartSeries = { name: string; data: number[] };
