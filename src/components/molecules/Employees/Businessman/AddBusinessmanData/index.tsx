import React from 'react';
import {
  Box,
  Container,
  Grid,
  Input,
  NumberInput,
  NumberInputField,
  Wrap,
  WrapItem,
  InputGroup,
  InputRightElement,
  Button,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import AddBusinessmanButtons from 'components/molecules/Employees/Businessman/AddBusinessmanButtons/index';
import breakpointsFontSize from 'components/molecules/Employees/styled/breakpointsFontSize';

const AddBusinessmanData = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{
    nameBusinessman: string;
    email: string;
    password: string;
    PIN: number;
  }>();

  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

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
          <WrapItem h="4em" w="100%" minWidth="28em">
            <Grid templateColumns="repeat(2, 1fr)" gap={2} w="100%">
              <Container px="2em" py="0.2em" fontWeight="Bold">
                Imię i Nazwisko
              </Container>
              <Box>
                <Input
                  border="1px"
                  borderRadius="2em"
                  borderColor="gray.300"
                  {...register('nameBusinessman', { required: 'Wprowadź imię oraz nazwisko' })}
                />
                {errors.nameBusinessman && (
                  <Box fontSize={breakpointsFontSize} color="red">
                    {errors.nameBusinessman.message}
                  </Box>
                )}
              </Box>
            </Grid>
          </WrapItem>
          <Container px="2em" py="0.2em" fontWeight="Bold">
            Dostęp do panelu administracyjnego
          </Container>
          <WrapItem w="100%" py="0.4em">
            <Box w="100%" borderTop="1px" borderColor="gray.300" />
          </WrapItem>
          <WrapItem h="9em" w="100%" minWidth="28em">
            <Grid templateColumns="repeat(2, 1fr)" gap={2} w="100%">
              <Container px="2em" py="0.2em" fontWeight="Bold">
                Email
              </Container>
              <Box>
                <Input
                  border="1px"
                  borderRadius="2em"
                  borderColor="gray.300"
                  {...register('email', {
                    required: 'Wprowadź adres mailowy',
                    pattern: {
                      value: /^[-\w\.]+@([-\w]+\.)+[a-z]+$/i,
                      message: 'Format maila : info@mfg.eu',
                    },
                  })}
                />
                {errors.email && (
                  <Box fontSize={breakpointsFontSize} color="red">
                    {errors.email.message}
                  </Box>
                )}
              </Box>
              <Container px="2em" py="0.2em" fontWeight="Bold">
                Hasło dostępu do panelu administracyjnego
              </Container>
              <Box>
                <InputGroup>
                  <Input
                    pr="4.5rem"
                    type={show ? 'text' : 'password'}
                    placeholder="Enter password"
                    {...register('password', {
                      required: 'Wprowadź hasło',
                      minLength: {
                        value: 8,
                        message: 'Za krótkie hasło. Hasło powinno zawierać minimum 8 znaków',
                      },
                    })}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                      {show ? 'Hide' : 'Show'}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                {errors.password && (
                  <Box fontSize={breakpointsFontSize} color="red">
                    {errors.password.message}
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
            <AddBusinessmanButtons />
          </WrapItem>
        </Wrap>
      </Box>
    </form>
  );
};

export default AddBusinessmanData;
