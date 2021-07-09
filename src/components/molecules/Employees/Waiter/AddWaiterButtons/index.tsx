import { Button, ButtonGroup, Box } from '@chakra-ui/react';

const AddWaiterButtons = () => (
  <ButtonGroup h="4em" w="100%" variant="outline" spacing="6">
    <Box minWidth="10%">
      <Button type="submit" bg="#33D268" h="2em" color="white" colorScheme="#33D268">
        Dodaj
      </Button>
    </Box>
    <Box minWidth="10%">
      <Button type="submit" h="2em" bg="white" colorScheme="gray">
        Anuluj
      </Button>
    </Box>
  </ButtonGroup>
);

export default AddWaiterButtons;
