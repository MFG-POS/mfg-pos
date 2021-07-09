import { Box, Container, Grid, Input, NumberInput, NumberInputField, Wrap, WrapItem } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import AddDriverButtons from 'components/molecules/Employees/Driver/AddDriverButtons/index';
import breakpointsFontSize from 'components/molecules/Employees/styled/breakpointsFontSize';

const AddDriverData = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{
    nameDriver: string;
    PIN: number;
  }>();

  const onSubmit = (data: Object) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box>
        <Wrap w="50%" h="8em" margin="0 auto">
          <WrapItem w="100%">
            <Box w="100%" borderTop="1px" borderColor="gray.300" />
          </WrapItem>
          <WrapItem h="6em" w="100%" minWidth="28em">
            <Grid templateColumns="repeat(2, 1fr)" gap={2} w="100%">
              <Container px="2em" py="0.2em" fontWeight="Bold">
                Imię i Nazwisko
              </Container>
              <Box>
                <Input
                  border="1px"
                  borderRadius="2em"
                  borderColor="gray.300"
                  {...register('nameDriver', { required: 'Wprowadź imię oraz nazwisko' })}
                />
                {errors.nameDriver && (
                  <Box fontSize={breakpointsFontSize} color="red">
                    {errors.nameDriver.message}
                  </Box>
                )}
              </Box>
            </Grid>
          </WrapItem>
          <Container px="2em" py="0.2em" fontWeight="Bold">
            Dostęp do terminalu
          </Container>
          <WrapItem w="100%" py="0.4em">
            <Box w="100%" borderTop="1px" borderColor="gray.300" />
          </WrapItem>
          <WrapItem h="4em" w="100%" minWidth="28em">
            <Grid templateColumns="repeat(2, 1fr)" gap={2} w="100%">
              <Container px="2em" py="0.2em" fontWeight="Bold">
                PIN do terminalu
              </Container>
              <NumberInput>
                <NumberInputField
                  maxLength={11}
                  border="1px"
                  borderRadius="2em"
                  borderColor="gray.300"
                  {...register('PIN', {
                    required: 'Brak PIN-u',
                    minLength: {
                      value: 2,
                      message: 'Za krótki numer PIN',
                    },
                  })}
                />
                {errors.PIN && (
                  <Box fontSize={breakpointsFontSize} color="red">
                    {errors.PIN.message}
                  </Box>
                )}
              </NumberInput>
            </Grid>
          </WrapItem>
          <WrapItem w="100%">
            <Box w="100%" borderTop="1px" borderColor="gray.300" />
          </WrapItem>
          <WrapItem>
            <AddDriverButtons />
          </WrapItem>
        </Wrap>
      </Box>
    </form>
  );
};

export default AddDriverData;
