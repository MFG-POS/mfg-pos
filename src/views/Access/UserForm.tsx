import { useEffect, useState } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Button, useToast } from '@chakra-ui/react';

import { ROUTE_ACCESS } from 'routing';

import { minLengthErrorMessage, requiredErrorMessage } from 'others/form-default-errors';

import FormTemplate from 'components/templates/FormTemplate';
import FormGroupInput from 'components/molecules/FormGroupInput';
import { getAll, getSingle, update } from 'api/firebase/firestore/firestore-actions';
import { UserDetails, UserWrite } from 'model/auth/user-details';
import { UserRole } from 'model/enums/user-role';
import FormGroupSelect from 'components/molecules/FormGroupSelect';
import { usersWithAdminRole } from 'api/firebase/firestore/firestore-filters';

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

  const checkUsers = (data: UserWrite): Promise<void> =>
    getAll<UserDetails>('users', [], [...usersWithAdminRole(doc!)])
      .then((documents) =>
        documents?.length >= 1 ? updateUser(data) : openToast('Musi istnieć przynajmniej jeden administrator', 'error'),
      )
      .catch((error) => {
        throw new Error(`Could not fetch users!. Error: ${error.message}`);
      });

  const openToast = (message: string, type: 'success' | 'error') => {
    toast({
      title: message,
      status: type,
      duration: 5000,
      isClosable: true,
    });
  };

  const updateUser = (data: UserWrite): Promise<void> =>
    update('users', doc!, data).then(() => {
      setIsSubmitted(true);
      openToast('Użytkownik zmodyfikowany 🙌', 'success');
    });

  const onSubmit = (data: UserWrite): Promise<void> => {
    if (doc && data.role !== 'ADMIN') return checkUsers(data);
    if (doc) return updateUser(data);
    throw new Error('Brak użytkownika do aktualizacji');
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
