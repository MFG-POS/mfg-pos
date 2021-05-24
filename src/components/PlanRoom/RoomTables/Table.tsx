import { Box, Textarea } from '@chakra-ui/react';
import { useDrag } from 'react-dnd';
import ItemTypes from './ItemTypes';
import { idElement } from './Item';

type IdType = {
  id: number;
};

const Table = ({ id }: IdType) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.TABLE,
    end: () => {
      idElement(id);
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <Textarea
      id={id.toString()}
      bg="#707070"
      color="white"
      textAlign="center"
      ref={drag}
      width="100%"
      height="100%"
      minHeight="40px"
      maxHeight="40px"
      paddingTop="5%"
      maxLength={4}
      onDoubleClick={() => {
        TableRadius(id.toString());
      }}
    />
  );
};

const TableRadius = (id: string) => {
  // @ts-ignore: Object is possibly 'null'.
  if (document.getElementById(id).style.borderRadius == '0%') {
    // @ts-ignore: Object is possibly 'null'.
    document.getElementById(id).style.borderRadius = '40%';
  } else {
    // @ts-ignore: Object is possibly 'null'.
    document.getElementById(id).style.borderRadius = '0%';
  }
};

export default Table;
