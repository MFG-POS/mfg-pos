import { useMemo } from 'react';
import { Row } from 'react-table';
import { Category } from '../../model/category';
import { ColumnDefinition, TableAction } from '../../model/table';
import AdvancedTable, { AdvancedTableProps } from '../table/AdvancedTable';

const Categories = () => {
  const onRowDelete = (row: Row<Category>): void => console.log(`Should delete row with id ${row.id}`);
  const onRowEdit = (row: Row<Category>): void => console.log(`Should edit row with id ${row.id}`);
  const onButtonClick = (): void => console.log(`Should do something on button click.`);
  const onFilterClick = (): void => console.log(`Should open filter menu.`);
  const onSearch = (value: string): void => console.log(`Should search by value '${value}' passed.`);

  const actions: TableAction<Category>[] = useMemo(
    () => [
      { name: 'Edytuj', callback: onRowEdit },
      { name: 'Usuń', callback: onRowDelete },
    ],
    [],
  );

  const data: Category[] = useMemo(
    () => [
      {
        id: 1,
        photo: 'https://pngimg.com/uploads/sugar/sugar_PNG8.png',
        name: 'Słodziki',
        type: 'Kategoria składników',
      },
      {
        id: 2,
        photo: 'https://pngimg.com/uploads/flour/flour_PNG11.png',
        name: 'Mąki',
        type: 'Kategoria składników',
      },
      {
        id: 3,
        photo: 'https://pngimg.com/uploads/soup/soup_PNG71.png',
        name: 'Zupy',
        type: 'Kategoria receptur',
      },
      {
        id: 4,
        photo: 'https://pngimg.com/uploads/sugar/sugar_PNG8.png',
        name: 'Słodziki',
        type: 'Kategoria składników',
      },
      {
        id: 5,
        photo: 'https://pngimg.com/uploads/flour/flour_PNG11.png',
        name: 'Mąki',
        type: 'Kategoria składników',
      },
      {
        id: 6,
        photo: 'https://pngimg.com/uploads/soup/soup_PNG71.png',
        name: 'Zupy',
        type: 'Kategoria receptur',
      },
    ],
    [],
  );

  const columns: ColumnDefinition<Category>[] = useMemo(
    () => [
      {
        Header: 'Zdjęcie',
        accessor: 'photo',
        minWidth: 200,
        isPhoto: true,
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

  const tableProps: AdvancedTableProps<Category> = {
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

  return <AdvancedTable<Category> {...tableProps} />;
};

export default Categories;
