import { useEffect, useState } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Button, useToast } from '@chakra-ui/react';

import { ROUTE_ACCESS } from 'routing';

import { CategoryWrite } from 'model/documents/category';

import { requiredErrorMessage } from 'others/form-default-errors';

import EmployeesTemplate from 'components/templates/EmployeesTemplate';
import FormInput from 'components/molecules/Access';
import { Employee } from 'model/documents/accesses';
import { getAll, saveAccess, updateAccess, getSingle } from 'api/firebase/firestore/firestore-actions';
import { Tax } from 'model/documents/tax';

const CryptoJS = require('crypto-js');

const AccessForm = () => {
  const [isSubmitted] = useState<boolean>(false);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CategoryWrite>();

  const [name, setName] = useState<Record<string, string>>({});
  const [surname, setSurname] = useState<Record<string, string>>({});
  const [pin, setPin] = useState<Record<string, string>>({});

  const [pinCheck, setPinCheck] = useState<String[]>([]);

  const location = useLocation<{ isEdit: boolean; id: string }>();
  const doc = location?.state?.id;

  const toast = useToast();

  useEffect(() => {
    getAll('accesses').then((data) => setPinCheck(data.map((tax) => String(tax.tax))));
  }, []);

  const onSubmit = (data: Employee) => {
    if (doc) {
      console.log(doc);
      updateAccess('accesses', doc, data);
      toast({
        title: 'Pracownik zmodyfikowany 🙌',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    let check: boolean = false;

    for (let position: number = 0; position < pinCheck.length; position++) {
      if (String(data.name) == 'Admin' || String(data.name) == 'Administrator') {
        check = true;
        break;
      } else {
        check = false;
      }
    }

    if (check == true) {
      toast({
        title: `${String(data.name)} już istnieje 🚫`,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } else {
      const password: Tax = data.tax;
      const encryptPassword = CryptoJS.AES.encrypt(password, 'Password').toString();
      data.tax = encryptPassword;
      saveAccess(data);

      toast({
        title: 'Pracownik został dodany 🙌',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    getAll('accesses').then((data) =>
      setName(data.reduce((acc, a) => ({ ...acc, [a.id!]: `${a.name}` }), {}) as Record<string, string>),
    );
    getAll('accesses').then((data) =>
      setSurname(
        data.reduce((acc, parent) => ({ ...acc, [parent.id!]: `${parent.parent}` }), {}) as Record<string, string>,
      ),
    );
    getAll('accesses').then((data) =>
      setPin(data.reduce((acc, tax) => ({ ...acc, [tax.id!]: `${tax.tax}` }), {}) as Record<string, string>),
    );
    if (doc) {
      getSingle('accesses', doc).then((data) => {
        reset({
          ...data,
          name: data?.name,
          parent: String(data?.parent),
          tax: String(data?.tax),
        });
      });
    }
  }, []);

  return (
    <>
      <EmployeesTemplate onSubmit={handleSubmit(onSubmit)}>
        {isSubmitted ? <Redirect to={ROUTE_ACCESS.EMPLOYEES.path} /> : null}
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
          id="parent"
          name="parent"
          register={register}
          errors={errors}
          validation={{ required: requiredErrorMessage }}
        />
        <FormInput
          type="text"
          label="PIN"
          id="tax"
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

export default AccessForm;
