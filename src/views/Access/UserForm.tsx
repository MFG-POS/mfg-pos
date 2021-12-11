import { useEffect, useState } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Button, useToast } from '@chakra-ui/react';

import { ROUTE_ACCESS } from 'routing';

import { minLengthErrorMessage, requiredErrorMessage } from 'others/form-default-errors';

import FormTemplate from 'components/templates/FormTemplate';
import FormGroupInput from 'components/molecules/FormGroupInput';
import { getSingle, update } from 'api/firebase/firestore/firestore-actions';
import { UserWrite } from 'model/auth/user-details';
import { UserRole } from 'model/enums/user-role';
import FormGroupSelect from 'components/molecules/FormGroupSelect';

const UserForm = () => {
  const location = useLocation<{ isEdit: boolean; id: string }>();

  const doc = location?.state?.id || null;

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const toast = useToast();

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

  const onSubmit = (data: UserWrite) => {
    if (doc) {
      return update('users', doc, data).then(() => {
        setIsSubmitted(true);
        toast({
          title: 'Użytkownik zmodyfikowany 🙌',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      });
    }
    throw new Error('Brak dokumentu do aktualizacji');
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
        <Button disabled={isSubmitting} type="submit" colorScheme="green" variant="solid" alignSelf="flex-start">
          Zapisz
        </Button>
      </FormTemplate>
    </>
  );
};

export default UserForm;
