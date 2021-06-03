import {
  Box,
  Container,
  Grid,
  Input,
  Textarea,
  NumberInput,
  NumberInputField,
  VStack,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import AddSupplierButtons from '../AddSupplierButtons/index';
import breakpoints from '../styled/AddSupplierData/breakpoints';
import breakpointsFontSize from '../styled/AddSupplierData/breakpointsFontSize';
import breakpointsMargin from '../styled/AddSupplierData/breakpointsMargin';

const AddSupplierData = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{
    nameSupplier: string;
    telephoneNumber: number;
    comment: string;
    productsSupplied: string;
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
      <Box>
        <Wrap w="100%" h="30em">
          <WrapItem w="100%">
            <Box w="100%" borderTop="1px" borderColor="gray.300" />
          </WrapItem>
          <WrapItem h="26em" w={breakpoints} minWidth="28em">
            <Grid templateColumns="repeat(2, 1fr)" gap={2} w="100%">
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
                {errors.nameSupplier && (
                  <Box fontSize={breakpointsFontSize} color="red">
                    {errors.nameSupplier.message}
                  </Box>
                )}
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
                {errors.telephoneNumber && (
                  <Box fontSize={breakpointsFontSize} color="red">
                    {errors.telephoneNumber.message}
                  </Box>
                )}
              </NumberInput>
              <Container px="2em" py="0.2em" fontWeight="Bold">
                Komentarz
              </Container>
              <Textarea
                maxHeight="8em"
                h="7em"
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
                  h="7em"
                  border="1px"
                  borderRadius="2em"
                  borderColor="gray.300"
                  {...register('productsSupplied', { required: 'Nie podano artykułów', minLength: 1 })}
                />
                {errors.productsSupplied && (
                  <Box fontSize={breakpointsFontSize} color="red">
                    {errors.productsSupplied.message}
                  </Box>
                )}
              </Box>
            </Grid>
          </WrapItem>
          <WrapItem w="1em" />
          <WrapItem h="26em" w={breakpoints} minWidth="28em">
            <VStack spacing={3} align="stretch" w="100%">
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
                      <Box fontSize={breakpointsFontSize} marginTop={breakpointsMargin} color="red">
                        <br />
                        {errors.city.message}
                      </Box>
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
                      <Box fontSize={breakpointsFontSize} marginTop={breakpointsMargin} color="red">
                        <br />
                        {errors.postalCode.message}
                      </Box>
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
                      <Box fontSize={breakpointsFontSize} marginTop={breakpointsMargin} color="red">
                        <br />
                        {errors.street.message}
                      </Box>
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
                      <Box fontSize={breakpointsFontSize} marginTop={breakpointsMargin} color="red">
                        <br />
                        {errors.buildingNumber.message}
                      </Box>
                    )}
                  </Box>
                </Grid>
              </Box>
            </VStack>
          </WrapItem>
          <WrapItem w="100%">
            <Box w="100%" borderTop="1px" borderColor="gray.300" />
          </WrapItem>
          <WrapItem>
            <AddSupplierButtons />
          </WrapItem>
        </Wrap>
      </Box>
    </form>
  );
};

export default AddSupplierData;
