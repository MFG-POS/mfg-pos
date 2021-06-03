import { Button, ButtonGroup, Box } from '@chakra-ui/react';
import breakpointsButton from 'components/molecules/PlanRoom/styled/breakpointsButton';
import breakpointsFontSize from 'components/molecules/PlanRoom/styled/breakpointsFontSize';
import { newTable, saveTables } from 'components/molecules/PlanRoom/RoomTables/Table';

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
          onClick={() => saveTables()}
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
          onClick={() => newTable()}
        >
          DODAJ STOLIK
        </Button>
      </Box>
    </ButtonGroup>
  </Box>
);

export default saveBoard;
