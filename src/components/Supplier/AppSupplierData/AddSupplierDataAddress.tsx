import { Container, Grid, Input, NumberInput, HStack, VStack, Box, PinInput, PinInputField } from '@chakra-ui/react';

const AddSupplierDataAddress = () => (
  <form>
    <VStack spacing={3} align="stretch">
      <Box h="3em" fontWeight="Bold">
        Adres
      </Box>
      <Box h="20em" w="40em" border="1px" borderRadius="2em" borderColor="gray.300">
        <Grid w="42em" h="20em" templateColumns="repeat(2, 1fr)" gap={6} p="2em">
          <Container px="2em" py="0.2em" fontWeight="Bold">
            Miasto
          </Container>
          <Input w="16em" border="1px" borderRadius="2em" borderColor="gray.300" />
          <Container px="2em" py="0.2em" fontWeight="Bold">
            Kod Pocztowy
          </Container>
          <NumberInput w="16em">
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
          <Container px="2em" py="0.2em" fontWeight="Bold">
            Ulica
          </Container>
          <Input w="16em" border="1px" borderRadius="2em" borderColor="gray.300" />
          <Container px="2em" py="0.2em" fontWeight="Bold">
            Numer budynku/lokalu
          </Container>
          <Input w="16em" border="1px" borderRadius="2em" borderColor="gray.300" />
        </Grid>
      </Box>
    </VStack>
  </form>
);

export default AddSupplierDataAddress;
