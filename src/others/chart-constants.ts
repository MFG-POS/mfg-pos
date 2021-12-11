import { ChartPeriod } from 'model/enums/chart-period';
import { dayTooltip, monthTooltip, weekTooltip } from 'others/string-constants';
import {
  FaCalendarAlt,
  FaCalendarDay,
  FaCalendarWeek,
  FaDollarSign,
  FaHandHoldingUsd,
  FaReceipt,
  FaUsers,
  FaWallet,
} from 'react-icons/all';
import { ChartType } from 'model/enums/chart-type';
import { PeriodElement, TypeElement } from 'model/chart/chart-types';

export const periodElements: PeriodElement[] = [
  { period: ChartPeriod.DAILY, tooltip: dayTooltip, icon: FaCalendarDay },
  { period: ChartPeriod.WEEKLY, tooltip: weekTooltip, icon: FaCalendarWeek },
  { period: ChartPeriod.MONTHLY, tooltip: monthTooltip, icon: FaCalendarAlt },
];

export const typeElements: TypeElement[] = [
  { type: ChartType.SALES_TRANSACTIONS, icon: FaHandHoldingUsd },
  { type: ChartType.SALES_CLIENTS, icon: FaUsers },
  { type: ChartType.SALES_AVERAGE_BILL, icon: FaReceipt },
  { type: ChartType.SALES_REVENUE, icon: FaWallet },
  { type: ChartType.SALES_PROFIT, icon: FaDollarSign },
];
