import { useMemo } from 'react';
import { Row } from 'react-table';
import { CategoryType } from 'model/enums/category-type';
import { ColumnDefinition, TableAction } from 'model/table/table-definitions';
import AdvancedTable, { AdvancedTableProps } from 'components/Table/AdvancedTable';
import { TableCategory } from 'model/table/table-types';

const Categories = () => {
  const onRowDelete = (row: Row<TableCategory>): void => console.log(`Should delete row with id ${row.id}`);
  const onRowEdit = (row: Row<TableCategory>): void => console.log(`Should edit row with id ${row.id}`);
  const onButtonClick = (): void => console.log(`Should do something on button click.`);
  const onFilterClick = (): void => console.log(`Should open filter menu.`);
  const onSearch = (value: string): void => console.log(`Should search by value '${value}' passed.`);

  const actions: TableAction<TableCategory>[] = useMemo(
    () => [
      { name: 'Edytuj', callback: onRowEdit },
      { name: 'Usuń', callback: onRowDelete },
    ],
    [],
  );

  const data: TableCategory[] = useMemo(
    () => [
      {
        id: '1',
        imagePath: 'https://pngimg.com/uploads/sugar/sugar_PNG8.png',
        name: 'Słodziki',
        type: CategoryType.INGREDIENTS,
      },
      {
        id: '2',
        imagePath: 'https://pngimg.com/uploads/flour/flour_PNG11.png',
        name: 'Mąki',
        type: CategoryType.INGREDIENTS,
      },
      {
        id: '3',
        imagePath: 'https://pngimg.com/uploads/soup/soup_PNG71.png',
        name: 'Zupy',
        type: CategoryType.RECIPES,
      },
      {
        id: '4',
        imagePath: 'https://pngimg.com/uploads/sugar/sugar_PNG8.png',
        name: 'Słodziki',
        type: CategoryType.INGREDIENTS,
      },
      {
        id: '5',
        imagePath: 'https://pngimg.com/uploads/flour/flour_PNG11.png',
        name: 'Mąki',
        type: CategoryType.INGREDIENTS,
      },
      {
        id: '6',
        imagePath: 'https://pngimg.com/uploads/soup/soup_PNG71.png',
        name: 'Zupy',
        type: CategoryType.RECIPES,
      },
    ],
    [],
  );

  const columns: ColumnDefinition<TableCategory>[] = useMemo(
    () => [
      {
        Header: 'Zdjęcie',
        accessor: 'imagePath',
        minWidth: 200,
        isImageColumn: true,
      },
      {
        Header: 'Nazwa',
        accessor: 'name',
        minWidth: 200,
      },
      {
        Header: 'Rodzaj',
        accessor: 'type',
        minWidth: 250,
      },
      {
        Header: 'Akcje',
        accessor: 'actions',
        actions,
      },
    ],
    [actions],
  );

  const tableProps: AdvancedTableProps<TableCategory> = {
    name: 'Kategorie',
    data,
    columns,
    showTopBar: true,
    showToolbar: true,
    showButton: true,
    showFilter: true,
    showSearchBar: true,
    onButtonClick,
    onFilterClick,
    onSearch,
  };

  return <AdvancedTable<TableCategory> {...tableProps} />;
};

export default Categories;
