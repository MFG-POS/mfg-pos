import { Container, Grid, Input, Textarea, NumberInput, NumberInputField } from '@chakra-ui/react';

const AddSupplierDataName = () => (
  <form>
    <Grid templateColumns="repeat(2, 1fr)" gap={6}>
      <Container px="2em" py="0.2em" fontWeight="Bold">
        Nazwa
      </Container>
      <Input border="1px" borderRadius="2em" borderColor="gray.300" />
      <Container px="2em" py="0.2em" fontWeight="Bold">
        Telefon
      </Container>
      <NumberInput>
        <NumberInputField maxLength={11} border="1px" borderRadius="2em" borderColor="gray.300" />
      </NumberInput>
      <Container px="2em" py="0.2em" fontWeight="Bold">
        Komentarz
      </Container>
      <Textarea maxHeight="8em" h="8em" border="1px" borderRadius="2em" borderColor="gray.300" />
      <Container px="2em" py="0.2em" fontWeight="Bold">
        Dostarczane artykuły
      </Container>
      <Textarea maxHeight="8em" h="8em" border="1px" borderRadius="2em" borderColor="gray.300" />
    </Grid>
  </form>
);

export default AddSupplierDataName;
