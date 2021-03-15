import { Button, ButtonGroup } from '@chakra-ui/react';

function AddSupplierButtons() {
  return (
    <ButtonGroup h="80px" variant="outline" spacing="6">
      <Button bg="#33D268" w="6%" h="40%" color="white" colorScheme="#33D268">
        Dodaj
      </Button>
      <Button w="6%" h="40%" bg="white" colorScheme="gray">
        Anuluj
      </Button>
    </ButtonGroup>
  );
}

export default AddSupplierButtons;
