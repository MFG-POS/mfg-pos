import { Button, ButtonGroup, Box } from '@chakra-ui/react';
import breakpointsButton from 'styled/PlanRoom/breakpointsButton';
import breakpointsFontSize from 'styled/PlanRoom/breakpointsFontSize';
import AddTable from './RoomTables/Board';

const saveBoard = () => (
  <Box h="4em" border="1px solid black">
    <ButtonGroup variant="outline" spacing="6" px="2em" py="0.8em">
      <Box minWidth="10%">
        <Button
          type="submit"
          bg="#33D268"
          h="2em"
          color="white"
          colorScheme="#33D268"
          borderColor="black"
          w={breakpointsButton}
          fontSize={breakpointsFontSize}
        >
          ZAPISZ POŁOŻENIE STOLIKÓW
        </Button>
      </Box>
      <Box minWidth="10%">
        <Button
          type="submit"
          bg="#33D268"
          h="2em"
          color="white"
          colorScheme="#33D268"
          borderColor="black"
          w={breakpointsButton}
          fontSize={breakpointsFontSize}
          onClick={() => AddTable(0, 0, -1)}
        >
          DODAJ STOLIK
        </Button>
      </Box>
    </ButtonGroup>
  </Box>
);

export default saveBoard;
