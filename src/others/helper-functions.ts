// eslint-disable-next-line import/no-duplicates
import { format } from 'date-fns';
// eslint-disable-next-line import/no-duplicates
import { pl } from 'date-fns/locale';

export const isNullOrUndefined = (value: unknown): boolean => value === null || value === undefined;
export const isNotNullOrUndefined = (value: unknown): boolean => !isNullOrUndefined(value);
export const isEmpty = (value: unknown): boolean =>
  isNullOrUndefined(value) ||
  (typeof value === 'string' && value.length === 0) ||
  (Array.isArray(value) && value.length === 0);
export const isNotEmpty = (value: unknown): boolean => !isEmpty(value);
export const formatChartDate = (date: Date): string => format(date, 'do LLLL', { locale: pl });
