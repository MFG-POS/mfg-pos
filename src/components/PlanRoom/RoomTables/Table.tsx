import { Box, Textarea } from '@chakra-ui/react';
import { useDrag } from 'react-dnd';
import ItemTypes from './ItemTypes';
import { TableType } from './Types';

const Table = ({ id, left, top, height, width, children, borderRadius }: TableType) => {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemTypes.TABLE,
      item: { id, left, top },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [id, left, top],
  );

  if (isDragging) {
    return <Box ref={drag} />;
  }
  return (
    <Box
      id={id}
      ref={drag}
      position="absolute"
      borderRadius={borderRadius}
      cursor="pointer"
      textAlign="center"
      padding="0.8rem"
      left={left}
      top={top}
      width={width}
      height={height}
      backgroundColor="#211F1F"
      color="white"
      role="Box"
      onDoubleClick={() => {
        TableRadius(id.toString());
      }}
    >
      {children}
    </Box>
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
