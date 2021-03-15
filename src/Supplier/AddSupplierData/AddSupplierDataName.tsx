import { Container, Grid, Input, Textarea, NumberInput, NumberInputField } from '@chakra-ui/react';

function AddSupplierDataName() {
  return (
    <form>
      <Grid templateColumns="repeat(2, 1fr)" gap={6}>
        <Container px="30" py="2" fontWeight="Bold">
          Nazwa
        </Container>
        <Input border="1px" borderRadius="20" borderColor="gray.300" />
        <Container px="30" py="2" fontWeight="Bold">
          Telefon
        </Container>
        <NumberInput>
          <NumberInputField maxlength={11} border="1px" borderRadius="20" borderColor="gray.300" />
        </NumberInput>
        <Container px="30" py="2" fontWeight="Bold">
          Komentarz
        </Container>
        <Textarea maxHeight="120" h="120" border="1px" borderRadius="20" borderColor="gray.300" />
        <Container px="30" py="2" fontWeight="Bold">
          Dostarczane artykuły
        </Container>
        <Textarea maxHeight="120" h="120" border="1px" borderRadius="20" borderColor="gray.300" />
      </Grid>
    </form>
  );
}

export default AddSupplierDataName;
