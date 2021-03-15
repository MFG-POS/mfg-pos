import {
  Container,
  Grid,
  Input,
  Textarea,
  NumberInput,
  HStack,
  VStack,
  Box,
  PinInput,
  PinInputField,
} from '@chakra-ui/react';

function AddSupplierDataAddress() {
  return (
    <form>
      <VStack spacing={3} align="stretch">
        <Box h="30" fontWeight="Bold">
          Address
        </Box>
        <Box h="300" w="90%" border="1px" borderRadius="20" borderColor="gray.300">
          <Grid w="90%" h="300" templateColumns="repeat(2, 1fr)" gap={6} p="10">
            <Container px="30" py="2" fontWeight="Bold">
              Miasto
            </Container>
            <Input w="90%" border="1px" borderRadius="20" borderColor="gray.300" />
            <Container px="30" py="2" fontWeight="Bold">
              Kod Pocztowy
            </Container>
            <NumberInput w="90%">
              <HStack>
                <PinInput type="number">
                  <PinInputField />
                  <PinInputField />
                  <p>-</p>
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                </PinInput>
              </HStack>
            </NumberInput>
            <Container px="30" py="2" fontWeight="Bold">
              Ulica
            </Container>
            <Input w="90%" border="1px" borderRadius="20" borderColor="gray.300" />
            <Container px="30" py="2" fontWeight="Bold">
              Numer budynku/lokalu
            </Container>
            <Input w="90%" border="1px" borderRadius="20" borderColor="gray.300" />
          </Grid>
        </Box>
        <Box h="30" />
      </VStack>
    </form>
  );
}

export default AddSupplierDataAddress;
