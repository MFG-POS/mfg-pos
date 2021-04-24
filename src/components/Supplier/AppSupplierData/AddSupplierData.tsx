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
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import AddSupplierButtons from 'components/Supplier/AddSupplierButtons';
import StyledSpan from 'styled/Supplier/AppSupplierData/StyledSpan';
import StyledWrapItem from 'styled/Supplier/AppSupplierData/StyledWrapItem';
import StyledGrid from 'styled/Supplier/AppSupplierData/StyledGrid';
import StyledVStack from 'styled/Supplier/AppSupplierData/StyledVStack';

const AddSupplierData = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{
    nameSupplier: string;
    telephoneNumber: number;
    comment: string;
    articlesSupplied: string;
    city: string;
    postalCode: string;
    street: string;
    buildingNumber: string;
  }>();

  const onSubmit = (data: Object) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack divider={<StackDivider borderColor="gray.200" />} spacing={3} align="stretch">
        <Wrap w="100%" h="30em">
          <StyledWrapItem h="26em">
            <StyledGrid templateColumns="repeat(2, 1fr)" gap={2}>
              <Container px="2em" py="0.2em" fontWeight="Bold">
                Nazwa
              </Container>
              <Box>
                <Input
                  border="1px"
                  borderRadius="2em"
                  borderColor="gray.300"
                  {...register('nameSupplier', { required: 'Brak numeru telefonu' })}
                />
                {errors.nameSupplier && <StyledSpan>{errors.nameSupplier.message}</StyledSpan>}
              </Box>
              <Container px="2em" py="0.2em" fontWeight="Bold">
                Telefon
              </Container>
              <NumberInput>
                <NumberInputField
                  maxLength={11}
                  border="1px"
                  borderRadius="2em"
                  borderColor="gray.300"
                  {...register('telephoneNumber', {
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
                maxHeight="8em"
                h="8em"
                border="1px"
                borderRadius="2em"
                borderColor="gray.300"
                {...register('comment')}
              />
              <Container px="2em" py="0.2em" fontWeight="Bold">
                Dostarczane artykuły
              </Container>
              <Box>
                <Textarea
                  maxHeight="8em"
                  h="8em"
                  border="1px"
                  borderRadius="2em"
                  borderColor="gray.300"
                  {...register('articlesSupplied', { required: 'Nie podano artykułów', minLength: 1 })}
                />
                {errors.articlesSupplied && <StyledSpan>{errors.articlesSupplied.message}</StyledSpan>}
              </Box>
            </StyledGrid>
          </StyledWrapItem>
          <StyledWrapItem h="26em">
            <StyledVStack spacing={3} align="stretch" w="100%">
              <Box h="3em" fontWeight="Bold">
                Adres
              </Box>
              <Box h="22em" w="100%" border="1px" borderRadius="2em" borderColor="gray.300">
                <Grid w="100%" h="20em" templateColumns="repeat(2, 1fr)" gap={4} p="2em">
                  <Container px="2em" py="0.2em" fontWeight="Bold">
                    Miasto
                  </Container>
                  <Box>
                    <Input
                      w="100%"
                      border="1px"
                      borderRadius="2em"
                      borderColor="gray.300"
                      {...register('city', { minLength: 1, required: 'Nie podano miasta' })}
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
                      w="100%"
                      maxLength={6}
                      border="1px"
                      borderRadius="2em"
                      borderColor="gray.300"
                      {...register('postalCode', {
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
                      w="100%"
                      border="1px"
                      borderRadius="2em"
                      borderColor="gray.300"
                      {...register('street', { minLength: 1, required: 'Nie podano ulicy' })}
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
                      w="100%"
                      border="1px"
                      borderRadius="2em"
                      borderColor="gray.300"
                      {...register('buildingNumber', { minLength: 1, required: 'Nie podano numeru budynku/lokalu' })}
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
            </StyledVStack>
          </StyledWrapItem>
          <WrapItem w="100%">
            <Box w="100%" borderTop="1px" borderColor="gray.300" marginTop="1em" />
          </WrapItem>
          <WrapItem>
            <AddSupplierButtons />
          </WrapItem>
        </Wrap>
      </VStack>
    </form>
  );
};

export default AddSupplierData;
