import { useEffect, useState } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Button, useToast } from '@chakra-ui/react';

import { ROUTE_SETTINGS } from 'routing';

import { Tax, TaxType } from 'model/documents/tax';

import { requiredErrorMessage } from 'others/form-default-errors';

import FormTemplate from 'components/templates/FormTemplate';
import FormGroupInput from 'components/molecules/FormGroupInput';
import FormGroupSelect from 'components/molecules/FormGroupSelect';
import FormGroupNumber from 'components/molecules/FormGroupNumber';
import FormGroupCheckbox from 'components/molecules/FormGroupCheckbox';
import { getSingle, save, update } from 'api/firebase/firestore/firestore-actions';

const TaxesForm = () => {
  const location = useLocation<{ isEdit: boolean; id: string }>();

  const doc = location?.state?.id || null;

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    reset,
  } = useForm<Tax>();

  const onSubmit: SubmitHandler<Tax> = (data: Tax) => {
    if (doc) {
      update('taxes', doc, { ...data, value: Number(data.value) }).then(() => {
        setIsSubmitted(true);
        toast({
          title: 'Podatek zmodyfikowany 🙌',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      });
      return;
    }
    const tax = { ...data, value: Number(data.value) };
    save('taxes', tax).then((ref) => {
      setIsSubmitted(true);
      toast({
        title: 'Podatek dodany 🙌',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    });
  };

  useEffect(() => {
    if (doc) {
      getSingle('taxes', doc).then((data) => {
        reset(data);
      });
    }
  }, []);

  const TAX_OPTIONS = Object.values(TaxType);
  return (
    <>
      <FormTemplate onSubmit={handleSubmit(onSubmit)}>
        {isSubmitted ? <Redirect to={ROUTE_SETTINGS.TAXES.path} /> : null}
        <FormGroupInput
          type="text"
          label="Nazwa podatku"
          id="name"
          name="name"
          register={register}
          errors={errors}
          validation={{ required: requiredErrorMessage }}
        />
        <FormGroupNumber
          label="Procent opodatkowania"
          id="value"
          name="value"
          register={register}
          errors={errors}
          validation={{ required: requiredErrorMessage }}
        />
        <Controller
          control={control}
          name="isFiscal"
          defaultValue={false}
          render={({ field: { onChange } }) => <FormGroupCheckbox label="Czy jest fiskalny?" onChange={onChange} />}
        />
        <FormGroupSelect
          label="Rodzaj podatku"
          id="taxType"
          name="type"
          placeholder="Wybierz rodzaj podatku"
          control={control}
          errors={errors}
          validation={{ required: requiredErrorMessage }}
          options={TAX_OPTIONS}
        />
        <Button isLoading={isSubmitting} type="submit" colorScheme="green" variant="solid" alignSelf="flex-start">
          Zapisz
        </Button>
      </FormTemplate>
    </>
  );
};

export default TaxesForm;
