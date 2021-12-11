import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Button, Flex, Heading, Icon, Link, Stack, Text, useToast } from '@chakra-ui/react';
import {
  emailPattern,
  invalidEmailErrorMessage,
  minLengthErrorMessage,
  requiredErrorMessage,
} from 'others/form-default-errors';
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

  const { login } = useAuth();
  const toast = useToast();

  const openToast = (message: string) => {
    toast({
      title: message,
      status: 'error',
      duration: 3000,
      isClosable: true,
    });
  };

  const onSubmit = (data: UserData) =>
    login(data.email, data.password)
      .then()
      .catch((error) => {
        if (error.code === 'auth/invalid-email') openToast('Wprowadzony adres e-mail jest błędny');
        if (error.code === 'auth/user-not-found') openToast('Nie znaleziono użytkownika o wskazanym adresie e-mail');
        if (error.code === 'auth/wrong-password') openToast('Wprowadzono błędne hasło');
      });

  return (
    <Stack px="4" py="32" mx="auto" w={{ base: '100%', md: '40%' }} as="form" onSubmit={handleSubmit(onSubmit)}>
      <Flex
        w={{ base: 'full' }}
        mx="auto"
        textAlign={{ base: 'left', md: 'center' }}
        direction="column"
        alignItems="center"
      >
        <Logo fontSize={{ base: '5xl' }} />
        <Heading
          mb="6"
          textAlign="center"
          fontSize={{ base: '5xl' }}
          fontWeight="bold"
          lineHeight="none"
          letterSpacing={{ base: 'normal', md: 'tight' }}
        >
          <Text
            display="inline"
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
          validation={{
            required: requiredErrorMessage,
            pattern: {
              value: emailPattern,
              message: invalidEmailErrorMessage,
            },
          }}
        />
        <FormInput
          type="password"
          label="Hasło"
          id="password"
          name="password"
          register={register}
          errors={errors}
          validation={{
            required: requiredErrorMessage,
            minLength: {
              value: 8,
              message: minLengthErrorMessage(8),
            },
          }}
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
            disabled={isSubmitting}
            type="submit"
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
        <Link as={RouterLink} to="/sign-up">
          Uzyskaj dostęp do systemu
        </Link>
      </Flex>
    </Stack>
  );
};

export default Login;
