import React, { useState } from 'react';
import FormTemplate from 'components/templates/FormTemplate';
import { Link as RouterLink, Redirect } from 'react-router-dom';
import FormGroupInput from 'components/molecules/FormGroupInput';
import {
  emailPattern,
  invalidEmailErrorMessage,
  invalidPasswordErrorMessage,
  minLengthErrorMessage,
  passwordPattern,
  requiredErrorMessage,
} from 'others/form-default-errors';
import { Button, ButtonGroup, Heading, Text, useToast } from '@chakra-ui/react';
import { useAuth } from 'auth/AuthContext';
import { SubmitHandler, useForm } from 'react-hook-form';
import { UserDetails, UserWrite } from 'model/auth/user-details';
import { set } from 'api/firebase/firestore/firestore-actions';

const SignUp = () => {
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const toast = useToast();
  const { signup } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserWrite>();

  const onSubmit: SubmitHandler<UserWrite> = (data) =>
    signup(data.email, data.password).then((firebaseUser) =>
      set<UserDetails>('users', prepareDetails(data), firebaseUser.user?.uid!).then(() => {
        setIsSubmitted(true);
        toast({
          title: 'Konto zostało utworzone, trwa weryfikacja administratora',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      }),
    );

  const prepareDetails = (data: UserWrite): UserDetails =>
    ({
      role: 'UNCLASSIFIED',
      email: data.email,
      name: data.name,
      surname: data.surname,
    } as UserDetails);

  return (
    <FormTemplate onSubmit={handleSubmit(onSubmit)}>
      {isSubmitted ? <Redirect to="/" /> : null}
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
          Rejestracja
        </Text>
      </Heading>
      <FormGroupInput
        type="text"
        label="Imię"
        id="name"
        name="name"
        register={register}
        errors={errors}
        validation={{
          required: requiredErrorMessage,
          minLength: {
            value: 4,
            message: minLengthErrorMessage(4),
          },
        }}
      />
      <FormGroupInput
        type="text"
        label="Nazwisko"
        id="surname"
        name="surname"
        register={register}
        errors={errors}
        validation={{
          required: requiredErrorMessage,
          minLength: {
            value: 4,
            message: minLengthErrorMessage(4),
          },
        }}
      />
      <FormGroupInput
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
      <FormGroupInput
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
          pattern: {
            value: passwordPattern,
            message: invalidPasswordErrorMessage,
          },
        }}
      />
      <ButtonGroup display="flex" alignItems="center" justifyContent="center">
        <Button
          variant="solid"
          colorScheme="purple"
          display="inline-flex"
          alignItems="center"
          justifyContent="center"
          w="auto"
          size="lg"
          disabled={isSubmitting}
          type="submit"
        >
          Uzyskaj dostęp
        </Button>
        <Button
          variant="outline"
          colorScheme="gray"
          display="inline-flex"
          alignItems="center"
          justifyContent="center"
          w="auto"
          size="lg"
          as={RouterLink}
          to="/login"
        >
          Zaloguj się
        </Button>
      </ButtonGroup>
    </FormTemplate>
  );
};

export default SignUp;
