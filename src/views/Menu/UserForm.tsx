import { useEffect, useState } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button, useToast } from '@chakra-ui/react';

import { ROUTE_ACCESS } from 'routing';

import { requiredErrorMessage } from 'others/form-default-errors';

import FormTemplate from 'components/templates/FormTemplate';
import FormGroupInput from 'components/molecules/FormGroupInput';
import { useAuth } from 'auth/AuthContext';
import { getSingle, set, update } from 'api/firebase/firestore/firestore-actions';
import { UserDetails, UserWrite } from 'model/auth/user-details';
import { UserRole } from 'model/enums/user-role';
import FormGroupSelect from 'components/molecules/FormGroupSelect';

const UserForm = () => {
  const location = useLocation<{ isEdit: boolean; id: string }>();

  const doc = location?.state?.id || null;

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const toast = useToast();
  const { signup } = useAuth();

  const roles: Record<string, string> = Object.entries(UserRole).reduce(
    (acc, kind) => ({ ...acc, [kind[0]]: `${kind[1]}` }),
    {},
  );

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<UserWrite>();

  useEffect(() => {
    if (doc) getSingle('users', doc).then((data) => reset(data));
  }, []);

  const onSubmit: SubmitHandler<UserWrite> = (data) => {
    if (doc) {
      update('users', doc, data).then(() => {
        setIsSubmitted(true);
        toast({
          title: 'Użytkownik zmodyfikowany 🙌',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      });
      return;
    }

    signup(data.email, data.password).then((firebaseUser) =>
      set<UserDetails>('users', data, firebaseUser.user?.uid!).then(() => {
        setIsSubmitted(true);
        toast({
          title: 'Użytkownik został utworzony 🙌',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      }),
    );
  };

  return (
    <>
      <FormTemplate onSubmit={handleSubmit(onSubmit)}>
        {isSubmitted ? <Redirect to={ROUTE_ACCESS.EMPLOYEES.path} /> : null}
        <FormGroupInput
          type="text"
          label="Imię"
          id="name"
          name="name"
          register={register}
          errors={errors}
          validation={{
            required: requiredErrorMessage,
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
          }}
        />
        {!doc && (
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
                value: /\S+@\S+\.\S+/,
                message: 'Entered value does not match email format',
              },
            }}
          />
        )}
        {!doc && (
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
                value: 5,
                message: 'min length is 5',
              },
            }}
          />
        )}
        <FormGroupSelect
          label="Rola"
          id="role"
          name="role"
          placeholder="Wybierz role"
          control={control}
          errors={errors}
          validation={{ required: requiredErrorMessage }}
          options={roles}
        />
        <Button isLoading={isSubmitting} type="submit" colorScheme="green" variant="solid" alignSelf="flex-start">
          Zapisz
        </Button>
      </FormTemplate>
    </>
  );
};

export default UserForm;
