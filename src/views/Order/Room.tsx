import { Box } from '@chakra-ui/react';
import { TablesType } from 'model/tableDND/row-type';
import { useState } from 'react';
import Load from 'components/molecules/Room/LoadPlanRoom/index';
import Alert from 'components/molecules/Room/Alert/index';
import { getAll } from 'api/firebase/firestore/firestore-actions';
import { DocumentReferenceHolder } from 'api/firebase/firebase.types';

const Room = () => {
  console.log(getAll('board'));

  const [tables, setTables] = useState<TablesType>({
    0: { top: 113, left: 0, text: '0', width: 100, height: 50, borderRadius: 40 },
    1: { top: 180, left: 594, text: '30', width: 100, height: 50, borderRadius: 0 },
    2: { top: 122, left: 796, text: '22', width: 100, height: 50, borderRadius: 0 },
    3: { top: 80, left: 403, text: '3', width: 100, height: 50, borderRadius: 40 },
    4: { top: 59, left: 468, text: '43', width: 100, height: 50, borderRadius: 0 },
    5: { top: 195, left: 151, text: '51', width: 100, height: 50, borderRadius: 0 },
  });

  return (
    <Box w="90%" h="60%" m="0 auto" position="relative" bg="#A1A1A1">
      <Alert />
      {Object.keys(tables).map((id) => {
        const { left, top, text, height, width, borderRadius } = tables[id];
        return (
          <Load
            key={id}
            id={id}
            left={left}
            top={top}
            height={height}
            width={width}
            borderRadius={borderRadius}
            text={text}
          >
            {text}
          </Load>
        );
      })}
    </Box>
  );
};

export default Room;
