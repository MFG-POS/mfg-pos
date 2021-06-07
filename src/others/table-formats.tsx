import { CellProps } from 'react-table';
import { MenuDocument } from 'model/menu/menu';
import { UnitOfMeasure } from 'model/enums/unit-of-measure';
import { Text } from '@chakra-ui/react';

type UnitOfMeasureKey = keyof typeof UnitOfMeasure;

export const currency = ({ value }: CellProps<MenuDocument>): JSX.Element => <Text> {`${value} zł`} </Text>;
export const percent = ({ value }: CellProps<MenuDocument>): JSX.Element => <Text> {`${value} %`} </Text>;
export const unitOfMeasure = ({ value }: CellProps<MenuDocument>): JSX.Element => (
  <Text> {`${UnitOfMeasure[value as UnitOfMeasureKey]}`} </Text>
);
