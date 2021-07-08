import { useEffect, useState } from 'react';
import { getAllOrders } from 'api/firebase/firestore/firestore-actions';
import { eachDayOfInterval, isSameDay, subDays } from 'date-fns';
import { Box, Heading } from '@chakra-ui/react';
import { ChartType } from 'model/enums/chart-type';
import SalesChart from 'components/molecules/Chart/SalesChart';
import { ApexOptions } from 'apexcharts';
import { useNonInitialEffect } from 'others/use-non-initial-effect';
import { formatChartDate } from 'others/helper-functions';
import { defaultChartOptions } from 'others/chart-options';
import { ChartSeries, SalesChartData } from 'model/chart/chart-types';
import SalesChartButtons from 'components/molecules/Chart/SalesChartButtons';
import { Order } from 'model/order/order';

const SalesStatistics = () => {
  const today: Date = new Date();

  const [chartType, setChartType] = useState<ChartType>(ChartType.SALES_TRANSACTIONS);
  const [options, setOptions] = useState<ApexOptions>(defaultChartOptions);
  const [series, setSeries] = useState<ChartSeries[]>([]);
  const [chartData, setChartData] = useState<SalesChartData[]>([]);

  useEffect(() => getOrders(), []);
  useNonInitialEffect(() => changeChartType(ChartType.SALES_TRANSACTIONS), [chartData]);

  const getOrders = (): void => {
    getAllOrders()
      .then((documents) => setChartData(mapOrdersToChartData(documents)))
      .catch((error) => {
        throw new Error(`Could not fetch orders!. Error: ${error.message}`);
      });
  };

  const getClosedOrders = (orders: Order[], date: Date): Order[] =>
    orders.filter((order) => order.closed && isSameDay(order.closureDate as Date, date));

  const calculateClientsCount = (orders: Order[]): number =>
    orders.reduce((previous, current) => previous + current.guestsCount, 0);

  const calculateAverageBill = (orders: Order[], transactionsCount: number): number =>
    orders.reduce((previous, current) => previous + current.total, 0) /
    (transactionsCount === 0 ? 1 : transactionsCount);

  const getCurrentWeekPeriod = (): Date[] => eachDayOfInterval({ start: subDays(today, 6), end: today });

  const mapOrdersToChartData = (documents: Order[]): SalesChartData[] =>
    getCurrentWeekPeriod().map((date) => {
      const orders = getClosedOrders(documents, date);
      const transactionsCount: number = orders.length;
      return {
        date,
        viewDate: formatChartDate(date),
        transactionsCount,
        clientsCount: calculateClientsCount(orders),
        averageBill: calculateAverageBill(orders, transactionsCount),
      } as SalesChartData;
    });

  const changeChartType = (type: ChartType): void => {
    setChartType(type);
    setSeries([{ name: type, data: chartData.map((singleData) => getChartProperty(singleData, type)) }]);
    setOptions((previousState) => ({
      ...previousState,
      xaxis: {
        categories: chartData.map((singleData) => singleData.viewDate),
      },
      yaxis: {
        labels: {
          formatter: (value: number): string | string[] =>
            ChartType.SALES_AVERAGE_BILL === type ? value.toFixed(2) : Math.round(value).toString(),
        },
      },
    }));
  };

  const getChartProperty = (singleData: SalesChartData, type: ChartType): number => {
    switch (type) {
      case ChartType.SALES_TRANSACTIONS:
        return singleData.transactionsCount;
      case ChartType.SALES_CLIENTS:
        return singleData.clientsCount;
      case ChartType.SALES_AVERAGE_BILL:
        return singleData.averageBill;
      default:
        throw new Error('Wskazano niepoprawny typ wykresu.');
    }
  };

  return (
    <Box>
      <Heading mb="4" align="center">
        {chartType}
      </Heading>
      <SalesChart options={options} series={series} />
      <SalesChartButtons changeChartType={changeChartType} />
    </Box>
  );
};

export default SalesStatistics;
