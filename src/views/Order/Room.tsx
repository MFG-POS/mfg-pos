import { Box } from '@chakra-ui/react';
import { TablesType } from 'model/tableDND/row-type';
import { useState, useEffect } from 'react';
import Load from 'components/molecules/Room/LoadPlanRoom/index';
import Alert from 'components/molecules/Room/Alert/index';
import { getTable } from 'api/firebase/firestore/firestore-actions';

const Room = () => {
  getTable('board').then((boards) => console.log(boards[0]));

  const [tables, setTables] = useState<TablesType>();

  useEffect(() => {
    getTable('board').then((boards) => setTables(boards[0]));
  }, [tables, setTables]);

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
