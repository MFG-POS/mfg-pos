import { useEffect, useState } from 'react';
import { getAllOrders } from 'api/firebase/firestore/firestore-actions';
import { addDays, addMonths, addWeeks } from 'date-fns';
import { Box, Heading } from '@chakra-ui/react';
import { ChartType } from 'model/enums/chart-type';
import SalesChart from 'components/molecules/Chart/SalesChart';
import { ApexOptions } from 'apexcharts';
import { useNonInitialEffect } from 'others/use-non-initial-effect';
import { defaultChartOptions } from 'others/chart-options';
import { ChartSeries, SalesChartData } from 'model/chart/chart-types';
import SalesChartButtons from 'components/molecules/Chart/SalesChartButtons';
import { Order } from 'model/order/order';
import { ChartPeriod } from 'model/enums/chart-period';
import { closedOrders } from 'api/firebase/firestore/firestore-filters';
import ChartPeriodChanger from 'components/molecules/Chart/ChartPeriodChanger';
import ChartPeriodHeading from 'components/molecules/Chart/ChartPeriodHeading';
import { mapIntervalsAndOrdersToChartData, mapWeekPeriodAndOrdersToChartData } from 'others/chart-functions';
import { getMonthsIntervals, getWeeksIntervals } from 'others/date-functions';

const SalesStatistics = () => {
  const today: Date = new Date();

  const [chartType, setChartType] = useState<ChartType>(ChartType.SALES_TRANSACTIONS);
  const [period, setChartPeriod] = useState<ChartPeriod>(ChartPeriod.DAILY);
  const [options, setOptions] = useState<ApexOptions>(defaultChartOptions);
  const [series, setSeries] = useState<ChartSeries[]>([]);
  const [chartData, setChartData] = useState<SalesChartData[]>([]);
  const [startDate, setStartDate] = useState<Date>(today);
  const [endDate, setEndDate] = useState<Date>(addDays(today, 7));

  useEffect(() => getOrders(), [endDate]);
  useNonInitialEffect(() => changeChartType(ChartType.SALES_TRANSACTIONS), [chartData]);

  const getOrders = (): void => {
    getAllOrders(closedOrders(startDate, endDate))
      .then((documents) => setChartData(mapOrdersToChartData(documents)))
      .catch((error) => {
        throw new Error(`Could not fetch orders!. Error: ${error.message}`);
      });
  };

  const mapOrdersToChartData = (documents: Order[]): SalesChartData[] => {
    if (ChartPeriod.DAILY === period) return mapWeekPeriodAndOrdersToChartData(documents, startDate, endDate);

    if (ChartPeriod.WEEKLY === period)
      return mapIntervalsAndOrdersToChartData(getWeeksIntervals(startDate, endDate), documents);

    return mapIntervalsAndOrdersToChartData(getMonthsIntervals(startDate, endDate), documents);
  };

  const changeDates = (date: Date): void => {
    setStartDate(date);
    calculateEndDay(date, period);
  };

  const changeChartPeriod = (chartPeriod: ChartPeriod): void => {
    setChartPeriod(chartPeriod);
    setStartDate(today);
    calculateEndDay(today, chartPeriod);
  };

  const calculateEndDay = (start: Date, chartPeriod: ChartPeriod): void => {
    if (ChartPeriod.DAILY === chartPeriod) setEndDate(addDays(start, 6));
    else if (ChartPeriod.WEEKLY === chartPeriod) setEndDate(addWeeks(start, 4));
    else if (ChartPeriod.MONTHLY === chartPeriod) setEndDate(addMonths(start, 12));
  };

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
            [ChartType.SALES_AVERAGE_BILL, ChartType.SALES_PROFIT, ChartType.SALES_REVENUE].includes(type)
              ? value.toFixed(2)
              : Math.round(value).toString(),
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
      case ChartType.SALES_REVENUE:
        return singleData.revenue;
      case ChartType.SALES_PROFIT:
        return singleData.profit;
      default:
        throw new Error('Wskazano niepoprawny typ wykresu.');
    }
  };

  return (
    <Box>
      <ChartPeriodHeading startDate={startDate} endDate={endDate} />
      <ChartPeriodChanger
        startDate={startDate}
        chartPeriod={period}
        changeChartPeriod={changeChartPeriod}
        onChange={changeDates}
      />
      <Heading mt="4rem" mb="1rem" align="center">
        {chartType}
      </Heading>
      <SalesChart options={options} series={series} />
      <SalesChartButtons changeChartType={changeChartType} />
    </Box>
  );
};

export default SalesStatistics;
