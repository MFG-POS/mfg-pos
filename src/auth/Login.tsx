import React from 'react';
import { useHistory } from 'react-router-dom';
import { Box, Button, Heading, Icon, Stack, Text, useColorModeValue, useToast } from '@chakra-ui/react';
import { requiredErrorMessage } from 'others/form-default-errors';
import { useAuth } from 'auth/AuthContext';
import { useForm } from 'react-hook-form';
import FormInput from 'components/molecules/Access';
import Logo from 'components/atoms/Logo';
import { UserData } from 'model/auth/user-data';

const Login = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<UserData>();

  const auth = useAuth();
  const history = useHistory();
  const toast = useToast();

  const openToast = (message: string) => {
    toast({
      title: message,
      status: 'error',
      duration: 3000,
      isClosable: true,
    });
  };

  const onSubmit = (data: UserData) => {
    auth
      .login(data.email, data.password)
      .then(() => history.push('/'))
      .catch((error) => {
        if (error.code === 'auth/wrong-password') openToast('Wskazano błędne hasło');
      });
  };

  return (
    <Box px="4" py="24" mx="auto" w="40%">
      <Box w={{ base: 'full' }} mx="auto" textAlign={{ base: 'left', md: 'center' }}>
        <Logo fontSize={{ base: '5xl' }} />
        <Heading
          mb="6"
          fontSize={{ base: '5xl' }}
          fontWeight="bold"
          lineHeight="none"
          letterSpacing={{ base: 'normal', md: 'tight' }}
          color={useColorModeValue('gray.900', 'gray.100')}
        >
          <Text
            display={{ base: 'block', lg: 'inline' }}
            w="full"
            bgClip="text"
            bgGradient="linear(to-r, green.400,purple.500)"
            fontWeight="extrabold"
          >
            Logowanie
          </Text>
        </Heading>
        <FormInput
          type="email"
          label="Adres e-mail"
          id="email"
          name="email"
          register={register}
          errors={errors}
          validation={{ required: requiredErrorMessage }}
        />
        <FormInput
          type="password"
          label="Hasło"
          id="password"
          name="password"
          register={register}
          errors={errors}
          validation={{ required: requiredErrorMessage }}
        />
        <Stack
          paddingTop="3em"
          direction={{ base: 'column', sm: 'row' }}
          mb={{ base: 4, md: 8 }}
          spacing="2"
          justifyContent={{ sm: 'left', md: 'center' }}
        >
          <Button
            variant="solid"
            colorScheme="purple"
            display="inline-flex"
            alignItems="center"
            justifyContent="center"
            w={{ base: 'full', sm: 'auto' }}
            mb={{ base: 2, sm: 0 }}
            size="lg"
            onClick={handleSubmit(onSubmit)}
            isLoading={isSubmitting}
          >
            Zaloguj
            <Icon boxSize="4" ml="1" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </Icon>
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default Login;
