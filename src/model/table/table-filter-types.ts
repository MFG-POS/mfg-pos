import { BaseObject } from 'model/base-object';
import { isNullOrUndefined } from 'others/helper-functions';
import { get } from 'lodash';

export type FilterFunctionDefinition = {
  displayValue: string;
  functionName: string;
  isIndependent?: boolean;
};

export type FilterRuleDefinition = {
  id: string;
  index: number;
  columnName: string;
  columnAccessor: string;
  value: string | number;
  function: FilterFunctionDefinition;
  operator?: FilterOperator;
};

export type FilterOperatorDefinition = {
  operator: FilterOperator;
  displayValue: string;
};

export type FilterOperator = '&&' | '||';

export type FilterColumn = {
  name: string;
  accessor: string;
};

type FilterFunction = (value: unknown, filterValue: string | number) => boolean;

type FilterFunctionsHolder = keyof FilterFunctions;

export abstract class FilterFunctions {
  private static getFilterFunction = (functionName: string): FilterFunction =>
    (FilterFunctions as FilterFunctionsHolder)[functionName];

  private static filterRow = <T extends BaseObject>(filter: FilterRuleDefinition, row: T): boolean =>
    FilterFunctions.getFilterFunction(filter.function.functionName)(get(row, filter.columnAccessor), filter.value);

  static filterRows = <T extends BaseObject>(
    data: T[],
    filterColumns: string[],
    filters: FilterRuleDefinition[],
  ): T[] => data.filter((row) => FilterFunctions.buildFilterResult(filters, row));

  private static buildFilterResult = <T extends BaseObject>(filters: FilterRuleDefinition[], row: T) =>
    filters.reduce<boolean>(
      (total, filter) =>
        isNullOrUndefined(filter.operator) || filter.operator === '&&'
          ? total && FilterFunctions.filterRow(filter, row)
          : total || FilterFunctions.filterRow(filter, row),
      true,
    );

  static equal = (value: unknown, filterValue: string | number): boolean => String(value) === String(filterValue);

  static notEqual = (value: unknown, filterValue: string | number): boolean => String(value) !== String(filterValue);

  static contains = (value: unknown, filterValue: string | number): boolean =>
    String(value).toLowerCase().includes(String(filterValue).toLowerCase());

  static doesNotContain = (value: unknown, filterValue: string | number): boolean =>
    !FilterFunctions.contains(value, filterValue);

  static startsWith = (value: unknown, filterValue: string | number): boolean =>
    String(value).startsWith(String(filterValue));

  static endsWith = (value: unknown, filterValue: string | number): boolean =>
    String(value).endsWith(String(filterValue));

  static isEmpty = (value: unknown): boolean => value === null || (typeof value === 'string' && value.length === 0);

  static isNotEmpty = (value: unknown): boolean => !FilterFunctions.isEmpty(value);

  static text = <T extends BaseObject>(data: T[], filterColumns: string[], filterValue: string): T[] =>
    data.filter((row) =>
      filterColumns.some((id) => String(row[id]).toLowerCase().includes(String(filterValue).toLowerCase())),
    );
}

export const filterOperators: FilterOperatorDefinition[] = [
  {
    operator: '&&',
    displayValue: 'i',
  },
  {
    operator: '||',
    displayValue: 'lub',
  },
];

export const filterFunctions: FilterFunctionDefinition[] = [
  { displayValue: 'zawiera', functionName: 'contains' },
  { displayValue: 'nie zawiera', functionName: 'doesNotContain' },
  { displayValue: 'jest równy/a', functionName: 'equal' },
  { displayValue: 'nie jest równy/a', functionName: 'notEqual' },
  { displayValue: 'zaczyna się od', functionName: 'startsWith' },
  { displayValue: 'kończy się na', functionName: 'endsWith' },
  { displayValue: 'jest pusta', functionName: 'isEmpty', isIndependent: true },
  { displayValue: 'nie jest pusta', functionName: 'isNotEmpty', isIndependent: true },
];
