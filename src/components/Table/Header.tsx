import { Th, Thead, Tr } from '@chakra-ui/react';
import { HeaderGroup } from 'react-table';
import { v4 as uuidv4 } from 'uuid';

type HeaderProps<T extends object> = {
  headerGroups: Array<HeaderGroup<T>>;
};

function Header<T extends object>(props: HeaderProps<T>) {
  const headerGroups: Array<HeaderGroup<T>> = props.headerGroups.map((group) => {
    const extendedGroup: HeaderGroup<T> = group;
    extendedGroup.id = uuidv4();
    return extendedGroup;
  });

  return (
    <Thead>
      {headerGroups.map((headerGroup) => (
        <Tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
          {headerGroup.headers.map((header, ia) => (
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
