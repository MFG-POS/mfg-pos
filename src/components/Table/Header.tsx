import { Th, Thead, Tr } from '@chakra-ui/react';
import { HeaderGroup } from 'react-table';
import { v4 as uuidv4 } from 'uuid';
import { BaseObject } from 'model/base-object';

type HeaderProps<T extends BaseObject> = {
  headerGroups: Array<HeaderGroup<T>>;
};

function Header<T extends BaseObject>(props: HeaderProps<T>) {
  const headerGroups: Array<HeaderGroup<T>> = props.headerGroups.map((group) => {
    const extendedGroup: HeaderGroup<T> = group;
    extendedGroup.id = uuidv4();
    return extendedGroup;
  });

  return (
    <Thead>
      {headerGroups.map((headerGroup) => (
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
