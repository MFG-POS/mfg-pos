import { Button, ButtonGroup, Box, Text } from '@chakra-ui/react';
import breakpointsFontSize from 'components/molecules/PlanRoom/styled/breakpointsFontSize';
import { NewTable, SaveTables, DeleteTables } from 'components/molecules/PlanRoom/RoomTables/Table';

const Buttons = () => (
  <Box h="4em" border="1px solid black">
    <ButtonGroup variant="outline" spacing="6" px="2em" py="0.8em">
      <Text minWidth="10%">
        <Button
          type="submit"
          bg="#33D268"
          h="2em"
          color="white"
          colorScheme="#33D268"
          borderColor="black"
          w="100%"
          fontSize={breakpointsFontSize}
          onClick={() => SaveTables()}
        >
          ZAPISZ POŁOŻENIE STOLIKÓW
        </Button>
      </Text>
      <Text minWidth="10%">
        <Button
          type="submit"
          bg="#33D268"
          h="2em"
          color="white"
          colorScheme="#33D268"
          borderColor="black"
          w="100%"
          fontSize={breakpointsFontSize}
          onClick={() => NewTable()}
        >
          DODAJ STOLIK
        </Button>
      </Text>
      <Text minWidth="10%">
        <Button
          type="submit"
          bg="#33D268"
          h="2em"
          color="white"
          colorScheme="#33D268"
          borderColor="black"
          w="100%"
          fontSize={breakpointsFontSize}
          onClick={() => DeleteTables()}
        >
          Wyczyść planszę
        </Button>
      </Text>
    </ButtonGroup>
  </Box>
);
export default Buttons;
