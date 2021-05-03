import { render } from 'react-dom';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Box } from '@chakra-ui/react';

const StartElement = () => {
  const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
    type: 'Box',
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      console.log(dropResult);
    },
  }));

  return (
    <Box ref={dragPreview} h="21px" w="21px" style={{ opacity: isDragging ? 0.5 : 1 }}>
      <Box h="21px" w="21px" bgColor="red" role="Handle" ref={drag}>
        🏠
      </Box>
    </Box>
  );
};

const DropElement = () => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'Box',
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
    drop: () => ({ name: 'title' }),
  }));

  return <Box h="81px" w="81px" ref={drop} style={{ backgroundColor: isOver ? 'red' : 'white' }} />;
};

const AddTable = () => {
  const Table = document.getElementById('board');
  render(
    <DndProvider backend={HTML5Backend}>
      <StartElement />
      <DropElement />
    </DndProvider>,
    Table,
  );
};

export default AddTable;
