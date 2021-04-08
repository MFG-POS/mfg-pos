import {
  Flex,
  Box,
  Container,
  Grid,
  Input,
  Textarea,
  NumberInput,
  NumberInputField,
  VStack,
  StackDivider,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import AddSupplierButtons from 'components/Supplier/AddSupplierButtons';
import styled from 'styled-components';

const AddSupplierData = () => {
  const { register, handleSubmit, errors } = useForm();

  const StyledSpan = styled.span`
    color: red;
    padding: 0.5rem 0 0 0;
  `;

  const onSubmit = (data: Object) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack divider={<StackDivider borderColor="gray.200" />} spacing={3} align="stretch">
        <Flex w="70em" h="30em">
          <Box w="80em" h="26em">
            <Grid templateColumns="repeat(2, 1fr)" gap={4}>
              <Container px="2em" py="0.2em" fontWeight="Bold">
                Nazwa
              </Container>
              <Box>
                <Input
                  border="1px"
                  borderRadius="2em"
                  borderColor="gray.300"
                  name="name"
                  ref={register({ required: 'Brak nazwy' })}
                />
                {errors.name && <StyledSpan>{errors.name.message}</StyledSpan>}
              </Box>
              <Container px="2em" py="0.2em" fontWeight="Bold">
                Telefon
              </Container>
              <NumberInput>
                <NumberInputField
                  name="telephoneNumber"
                  maxLength={11}
                  border="1px"
                  borderRadius="2em"
                  borderColor="gray.300"
                  ref={register({
                    required: 'Brak numeru telefonu',
                    minLength: {
                      value: 9,
                      message: 'Za krótki numer telefonu',
                    },
                  })}
                />
                {errors.telephoneNumber && <StyledSpan>{errors.telephoneNumber.message}</StyledSpan>}
              </NumberInput>
              <Container px="2em" py="0.2em" fontWeight="Bold">
                Komentarz
              </Container>
              <Textarea
                name="comment"
                maxHeight="8em"
                h="8em"
                border="1px"
                borderRadius="2em"
                borderColor="gray.300"
                ref={register}
              />
              <Container px="2em" py="0.2em" fontWeight="Bold">
                Dostarczane artykuły
              </Container>
              <Box>
                <Textarea
                  name="articlesSupplied"
                  maxHeight="8em"
                  h="8em"
                  border="1px"
                  borderRadius="2em"
                  borderColor="gray.300"
                  ref={register({ required: 'Nie podano artykułów', minLength: 1 })}
                />
                {errors.articlesSupplied && <StyledSpan>{errors.articlesSupplied.message}</StyledSpan>}
              </Box>
            </Grid>
          </Box>
          <Box w="6em" h="26em" />
          <Box w="100em" h="26em">
            <VStack spacing={3} align="stretch">
              <Box h="3em" fontWeight="Bold">
                Adres
              </Box>
              <Box h="22em" w="40em" border="1px" borderRadius="2em" borderColor="gray.300">
                <Grid w="42em" h="20em" templateColumns="repeat(2, 1fr)" gap={4} p="2em">
                  <Container px="2em" py="0.2em" fontWeight="Bold">
                    Miasto
                  </Container>
                  <Box>
                    <Input
                      name="city"
                      w="16em"
                      border="1px"
                      borderRadius="2em"
                      borderColor="gray.300"
                      ref={register({ minLength: 1, required: 'Nie podano miasta' })}
                    />
                    {errors.city && (
                      <StyledSpan>
                        <br />
                        {errors.city.message}
                      </StyledSpan>
                    )}
                  </Box>
                  <Container px="2em" py="0.2em" fontWeight="Bold">
                    Kod Pocztowy
                  </Container>
                  <Box>
                    <Input
                      w="16em"
                      name="postalCode"
                      maxLength={6}
                      border="1px"
                      borderRadius="2em"
                      borderColor="gray.300"
                      ref={register({
                        required: 'Brak kodu pocztowego',
                        pattern: {
                          value: /[0-9]{2}-[0-9]{3}/i,
                          message: 'Format kodu pocztowego : dd-ddd',
                        },
                      })}
                    />
                    {errors.postalCode && (
                      <StyledSpan>
                        <br />
                        {errors.postalCode.message}
                      </StyledSpan>
                    )}
                  </Box>
                  <Container px="2em" py="0.2em" fontWeight="Bold">
                    Ulica
                  </Container>
                  <Box>
                    <Input
                      name="street"
                      w="16em"
                      border="1px"
                      borderRadius="2em"
                      borderColor="gray.300"
                      ref={register({ minLength: 1, required: 'Nie podano ulicy' })}
                    />
                    {errors.street && (
                      <StyledSpan>
                        <br />
                        {errors.street.message}
                      </StyledSpan>
                    )}
                  </Box>
                  <Container px="2em" py="0.2em" fontWeight="Bold">
                    Numer budynku/lokalu
                  </Container>
                  <Box>
                    <Input
                      name="buildingNumber"
                      w="16em"
                      border="1px"
                      borderRadius="2em"
                      borderColor="gray.300"
                      ref={register({ minLength: 1, required: 'Nie podano numeru budynku/lokalu' })}
                    />
                    {errors.buildingNumber && (
                      <StyledSpan>
                        <br />
                        {errors.buildingNumber.message}
                      </StyledSpan>
                    )}
                  </Box>
                </Grid>
              </Box>
            </VStack>
          </Box>
        </Flex>
        <Box w="72em">
          <AddSupplierButtons />
        </Box>
      </VStack>
    </form>
  );
};

export default AddSupplierData;
