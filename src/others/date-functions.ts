// eslint-disable-next-line import/no-duplicates
import { addDays, eachDayOfInterval, eachMonthOfInterval, eachWeekOfInterval, format, getDate } from 'date-fns';
// eslint-disable-next-line import/no-duplicates
import { pl } from 'date-fns/locale';
import { dateFormat } from 'others/string-constants';
import { getDay } from 'date-fns/esm';

export const formatChartDate = (date: Date): string => format(date, 'do LLLL', { locale: pl });
export const formatDate = (date: Date): string => format(date, dateFormat, { locale: pl });

export const getCurrentWeekPeriod = (start: Date, end: Date): Date[] => eachDayOfInterval({ start, end });

export const getIntervals = (dates: Date[], increment: number): Date[][] =>
  dates
    .map((date) => addDays(date, increment))
    .map((date, index, array) => (index < array.length - 1 ? [date, array[index + 1]] : []))
    .filter((array) => array.length > 0);

export const getWeeksIntervals = (start: Date, end: Date): Date[][] =>
  getIntervals(eachWeekOfInterval({ start, end }, { weekStartsOn: 1 }), getDay(start) - 1);

export const getMonthsIntervals = (start: Date, end: Date): Date[][] =>
  getIntervals(eachMonthOfInterval({ start, end }), getDate(start) - 1);
