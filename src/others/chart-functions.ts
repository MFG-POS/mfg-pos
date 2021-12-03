import { Order } from 'model/order/order';
import { flatten } from 'lodash';
import { SalesChartData } from 'model/chart/chart-types';
import { isSameDay, isWithinInterval } from 'date-fns';
import { formatChartDate, getCurrentWeekPeriod } from 'others/date-functions';

const calculateClientsCount = (orders: Order[]): number =>
  orders.reduce((previous, current) => previous + current.guestsCount, 0);

const calculateAverageBill = (orders: Order[], transactionsCount: number): number =>
  orders.reduce((previous, current) => previous + current.total, 0) / (transactionsCount === 0 ? 1 : transactionsCount);

const calculateRevenue = (orders: Order[]): number => orders.reduce((previous, current) => previous + current.total, 0);

const calculateProfit = (orders: Order[]): number =>
  flatten(orders.map((order) => order.items))
    .map((item) => item.document)
    .reduce((previous, document) => previous + document.netPrice * (document.overhead / 100), 0);

const getOrdersClosedOnDay = (orders: Order[], date: Date): Order[] =>
  orders.filter((order) => isSameDay(order.closureDate as Date, date));

const getOrdersClosedInInterval = (orders: Order[], start: Date, end: Date): Order[] =>
  orders.filter((order) => isWithinInterval(order.closureDate as Date, { start, end }));

export const mapWeekPeriodAndOrdersToChartData = (documents: Order[], start: Date, end: Date): SalesChartData[] =>
  getCurrentWeekPeriod(start, end).map((date) =>
    prepareChartData(getOrdersClosedOnDay(documents, date), formatChartDate(date)),
  );

export const mapIntervalsAndOrdersToChartData = (intervals: Date[][], documents: Order[]): SalesChartData[] =>
  intervals.map((dates) =>
    prepareChartData(
      getOrdersClosedInInterval(documents, dates[0], dates[1]),
      `${formatChartDate(dates[0])} - ${formatChartDate(dates[1])}`,
    ),
  );

export const prepareChartData = (orders: Order[], viewDate: string): SalesChartData => {
  const transactionsCount: number = orders.length;
  return {
    viewDate,
    transactionsCount,
    revenue: calculateRevenue(orders),
    profit: calculateProfit(orders),
    clientsCount: calculateClientsCount(orders),
    averageBill: calculateAverageBill(orders, transactionsCount),
  } as SalesChartData;
};
