import { Th, Thead, Tr } from '@chakra-ui/react';
import { HeaderGroup } from 'react-table';
import { v4 as uuidv4 } from 'uuid';
import { BaseObject } from 'model/base-object';

type HeaderProps<T extends BaseObject> = {
  headerGroups: Array<HeaderGroup<T>>;
};

function Header<T extends BaseObject>({ headerGroups }: HeaderProps<T>) {
  const extendedHeaderGroups: Array<HeaderGroup<T>> = headerGroups.map((group) => ({
    ...group,
    id: uuidv4(),
  }));

  return (
    <Thead>
      {extendedHeaderGroups.map((headerGroup) => (
        <Tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <Th {...header.getHeaderProps()} key={header.id}>
              {header.render('Header')}
            </Th>
          ))}
        </Tr>
      ))}
    </Thead>
  );
}

export default Header;
