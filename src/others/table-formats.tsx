import { CellProps } from 'react-table';
import { MenuDocument } from 'model/menu/menu';
import { UnitOfMeasure } from 'model/enums/unit-of-measure';

type UnitOfMeasureKey = keyof typeof UnitOfMeasure;

export const currency = ({ value }: CellProps<MenuDocument>): JSX.Element => <div> {`${value} zł`} </div>;
export const percent = ({ value }: CellProps<MenuDocument>): JSX.Element => <div> {`${value} %`} </div>;
export const unitOfMeasure = ({ value }: CellProps<MenuDocument>): JSX.Element => (
  <div> {`${UnitOfMeasure[value as UnitOfMeasureKey]}`} </div>
);
