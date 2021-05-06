export const isNullOrUndefined = (value: unknown): boolean => value === null || value === undefined;
export const isNotNullOrUndefined = (value: unknown): boolean => !isNullOrUndefined(value);
export const isEmpty = (value: unknown): boolean =>
  isNullOrUndefined(value) || (typeof value === 'string' && value.length === 0);
export const isNotEmpty = (value: unknown): boolean => !isEmpty(value);
