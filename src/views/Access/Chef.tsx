import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Button, useToast } from '@chakra-ui/react';

import { ROUTE_MENU } from 'routing';

import { CategoryWrite } from 'model/documents/category';

import { requiredErrorMessage } from 'others/form-default-errors';

import EmployeesTemplate from 'components/templates/EmployeesTemplate';
import FormInput from 'components/molecules/Access';
import { Access } from 'model/access/access';

const Chef = () => {
  const [isSubmitted] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CategoryWrite>();

  const toast = useToast();

  const onSubmit = (data: Access) => {
    // saveAccess(getAccess);

    toast({
      title: 'Kelner został dodany 🙌',
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <>
      <EmployeesTemplate onSubmit={handleSubmit(onSubmit)}>
        {isSubmitted ? <Redirect to={ROUTE_MENU.CATEGORIES.path} /> : null}
        <FormInput
          type="text"
          label="Imię"
          id="name"
          name="name"
          register={register}
          errors={errors}
          validation={{ required: requiredErrorMessage }}
        />
        <FormInput
          type="text"
          label="Nazwisko"
          id="surname"
          name="parent"
          register={register}
          errors={errors}
          validation={{ required: requiredErrorMessage }}
        />
        <FormInput
          type="text"
          label="PIN"
          id="PIN"
          name="tax"
          register={register}
          errors={errors}
          validation={{ required: requiredErrorMessage }}
        />
        <Button isLoading={isSubmitting} type="submit" colorScheme="green" variant="solid" alignSelf="flex-start">
          Zapisz
        </Button>
      </EmployeesTemplate>
    </>
  );
};

export default Chef;
