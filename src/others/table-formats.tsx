import { CellProps } from 'react-table';
import { MenuDocument } from 'model/menu/menu';
import { UnitOfMeasure } from 'model/enums/unit-of-measure';
import { Text } from '@chakra-ui/react';
import { CategoryKind } from 'model/enums/category-kind';

type UnitOfMeasureKey = keyof typeof UnitOfMeasure;
type CategoryKindKey = keyof typeof CategoryKind;

export const currency = ({ value }: CellProps<MenuDocument>): JSX.Element => <Text> {`${value} zł`} </Text>;
export const percent = ({ value }: CellProps<MenuDocument>): JSX.Element => <Text> {`${value} %`} </Text>;
export const unitOfMeasure = ({ value }: CellProps<MenuDocument>): JSX.Element => (
  <Text> {`${UnitOfMeasure[value as UnitOfMeasureKey]}`} </Text>
);
export const categoryKind = ({ value }: CellProps<MenuDocument>): JSX.Element => (
  <Text> {`${CategoryKind[value as CategoryKindKey]}`} </Text>
);
export const booleanDisplay = ({ value }: CellProps<MenuDocument>): JSX.Element => (
  <Text> {`${value ? 'Tak' : 'Nie'}`} </Text>
);
