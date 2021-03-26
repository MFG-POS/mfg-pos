import { Button, ButtonGroup } from '@chakra-ui/react';

const AddSupplierButtons = () => (
  <ButtonGroup h="4em" w="60em" variant="outline" spacing="6">
    <Button bg="#33D268" w="6em" h="2em" color="white" colorScheme="#33D268">
      Dodaj
    </Button>
    <Button w="6em" h="2em" bg="white" colorScheme="gray">
      Anuluj
    </Button>
  </ButtonGroup>
);

export default AddSupplierButtons;
